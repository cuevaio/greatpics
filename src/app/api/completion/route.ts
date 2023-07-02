import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

import { aiRatelimit } from "@/lib/upstash"
import { getClientID } from "@/lib/utils/get-client-id"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(request: Request) {
  try {
    let result: {
      success: boolean
      limit: number
      remaining: number
      reset: number
    } | null = null

    if (!!process.env.VERCEL) {
      const client_id = await getClientID()
      const identifier = `api/completion:${client_id}`
      result = await aiRatelimit.limit(identifier)

      if (!result.success) {
        return new Response("Exceeded maximum api calls quote", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.reset),
          },
        })
      }
    }

    const { draft, caption } = await request.json()

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "USER will provide you with a draft and a caption of a picture made by an AI. " +
            "Use the following step-by-step instructions to respond to user inputs.\n" +
            '1. If an animal or person is present in the picture, use the draft to infer its name. Respond with a prefix that says "Entity: ".\n' +
            '2. Convert the draft into a professional tweet keeping the style of USER. Respond with a prefix that says "Tweet: ".\n' +
            '3. Use the caption and the context from past steps to generate a description for the picture in 1 or 2 sentences. Respond with a prefix that says "Description: ".\n' +
            '4. Make the description optimized for screen readers in order to be accessible for blind people. It needs to be very descriptive and in third person. Respond with a prefix that says "Alt: ".',
        },
        {
          role: "user",
          content:
            'Draft: """' +
            draft +
            '"""' +
            "\n" +
            '"""Caption: ' +
            caption +
            '"""',
        },
      ],
      temperature: 0.75,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream, {
      headers: result
        ? {
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.reset),
          }
        : {},
    })
  } catch (error) {
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
