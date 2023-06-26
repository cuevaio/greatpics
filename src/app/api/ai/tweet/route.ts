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
    const client_id = await getClientID();
    console.log("tweet", { client_id });
    const identifier = `api/ai/tweet:${client_id}`;
    const result = await ratelimit.limit(identifier);

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

    const { draft } = await request.json();

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      stream: true,
      temperature: 0.6,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      prompt: `Given the draft of a tweet, improve it to be trending while keeping the writing style.
draft tweet:
${draft}

improved tweet:
`,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream, {
      headers: {
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(result.reset),
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
