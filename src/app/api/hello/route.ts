export const runtime = "edge";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { time } = await request.json();
  const time_executed = new Date().toISOString();
  const h = { time_published: time, time_executed };
  console.log(h);

  return NextResponse.json(h);
}
