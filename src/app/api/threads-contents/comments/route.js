import { NextResponse } from "next/server";
import Threads_Contents_Comment from "../../../models/Threads_Contents_Comment";

export async function GET() {
  try {
    const threads_contents_comments = await Threads_Contents_Comment.findAll();
    return NextResponse.json(threads_contents_comments);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadsContentsId, userId, comment } = await request.json();
  try {
    const threads_contents_comment = await Threads_Contents_Comment.create({
      threadsContentsId: threadsContentsId,
      userId: userId,
      comment: comment
    });
    return NextResponse.json(threads_contents_comment);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
