import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ratelimit } from "@/lib/redis";
import { getClientID } from "@/lib/utils/get-client-id";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(request: Request) {
  try {
    let result: {
      success: boolean;
      limit: number;
      remaining: number;
      reset: number;
    } | null = null;

    if (!!process.env.VERCEL) {
      const client_id = await getClientID();
      const identifier = `api/ai/tweet:${client_id}`;
      result = await ratelimit.limit(identifier);

      if (!result.success) {
        return new Response("Exceeded maximum api calls quote", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.reset),
          },
        });
      }
    }

    const { draft } = await request.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI content creation assistant that generates trending tweets. " +
            "You will receive the draft written by a user. " +
            "Keep writting style and improve the draft to generate the perfect tweet. " +
            "Limit your response to no more than 280 characters. ",
        },
        {
          role: "user",
          content: draft,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream, {
      headers: result
        ? {
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.reset),
          }
        : {},
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
