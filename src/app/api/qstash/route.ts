export const runtime = "edge";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await fetch("https://qstash.upstash.io/v1/publish/https://greatpics.app/api/hello", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(process.env.UPSTASH_QSTASH_TOKEN),
        "Content-type": "application/json",
        "Upstash-Delay": "30s",
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    });

    return NextResponse.json({ status: "scheduled" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error" });
  }
}
