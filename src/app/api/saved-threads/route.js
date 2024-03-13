import { NextResponse } from "next/server";
import { Saved_Thread } from "@/app/models";

export async function POST(request) {
  const { userId, threadId } = await request.json();
  try {
    const saved_thread = await Saved_Thread.create({
      userId: userId,
      threadId: threadId,
    });
    return NextResponse.json(saved_thread);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
