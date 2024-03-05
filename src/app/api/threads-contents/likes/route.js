import { NextResponse } from "next/server";
import { Threads_Contents_Like } from "@/app/models";

export async function GET() {
  try {
    const threads_contents_likes = await Threads_Contents_Like.findAll();
    return NextResponse.json(threads_contents_likes);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadsContentsId, userId } = await request.json();
  try {
    const threads_contents_like = await Threads_Contents_Like.create({
      threadsContentsId: threadsContentsId,
      userId: userId,
    });
    return NextResponse.json(threads_contents_like);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
