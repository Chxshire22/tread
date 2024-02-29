import { NextResponse } from "next/server";
import Saved_Thread from "../../models/Saved_Thread";

export async function GET() {
  try {
    const saved_threads = await Saved_Thread.findAll();
    return NextResponse.json(saved_threads);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

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
