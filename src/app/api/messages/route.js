import { NextResponse } from "next/server";
import Message from "../../models/Message";

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
  const { senderId, content, imageUrl, viewed } = await request.json();
  try {
    const message = await Message.create({
      senderId: senderId,
      content: content,
      imageUrl: imageUrl,
      viewed: viewed
    });
    return NextResponse.json(message);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
