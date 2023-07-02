export const runtime = "edge";

import Replicate from "replicate";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";

import { imageRatelimit } from "@/lib/upstash";
import { getClientID } from "@/lib/utils/get-client-id";
import { getXataClient } from "@/lib/xata";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

const schema = z.object({
  aspect_ratio: z.number(),
  url: z.string().url(),
});

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
      const identifier = `api/pics:${client_id}`;
      result = await imageRatelimit.limit(identifier);

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

    const body = await request.json();
    const headersList = headers();
    const host = headersList.get("host");

    const { url, aspect_ratio } = schema.parse(body);

    const output = await replicate.run(
      "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
      {
        input: {
          image: url,
        },
      }
    );

    const pic = await getXataClient().db.pic.create({
      url,
      caption: String(output).replace("Caption: ", ""),
      aspect_ratio,
    });

    const id = pic.id.split("_")[1];
    console.log({ host });
    await fetch(
      `https://qstash.upstash.io/v1/publish/https://${host}/api/pics/delete`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(process.env.UPSTASH_QSTASH_TOKEN),
          "Content-type": "application/json",
          "Upstash-Delay": "1m",
        },
        body: JSON.stringify({ id, url }),
      }
    );

    return NextResponse.json(
      {
        id,
      },
      {
        status: 200,
        headers: result
          ? {
              "X-RateLimit-Limit": String(result.limit),
              "X-RateLimit-Remaining": String(result.remaining),
              "X-RateLimit-Reset": String(result.reset),
            }
          : {},
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
