import { z } from "zod";

import { NextResponse } from "next/server";
import { getXataClient } from "@/lib/xata";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

const schema = z.object({
  aspect_ratio: z.number(),
  url: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const { url, aspect_ratio } = await request.json();

    const data = schema.parse({
      url,
      aspect_ratio,
    });

    const output = await replicate.run(
      "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
      {
        input: {
          image: data.url,
        },
      }
    );

    const pic = await getXataClient().db.pic.create({
      url,
      caption: String(output),
      aspect_ratio,
    });

    const id = pic.id.split("_")[1];

    return NextResponse.json(
      {
        id,
      },
      {
        status: 200,
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
