export const runtime = "edge";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";
import { z } from "zod";

import { getXataClient } from "@/lib/xata";

const schema = z.object({
  id: z.string(),
  url: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, url } = schema.parse(body);

    const ut_id = url.split("/f/")[1];
    await utapi.deleteFiles(ut_id);

    await getXataClient().db.pic.delete(id);

    console.log("Deleted pic", { id, url });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
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
