import { NextResponse } from "next/server";
import { Message } from "@/app/models";

export async function GET() {
  try {
    const messages = await Message.findAll();
    return NextResponse.json(messages);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { senderId, content, imageUrl, viewed, chatroomId } = await request.json();
  try {
    const message = await Message.create({
      senderId,
      content,
      imageUrl,
      viewed,
      chatroomId: Number(chatroomId)
    });
    return NextResponse.json(message);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
