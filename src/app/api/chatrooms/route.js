import { NextResponse } from "next/server";
import { Chatroom } from "@/app/models";

export async function GET() {
  try {
    const chatrooms = await Chatroom.findAll();
    return NextResponse.json(chatrooms);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

//filepath + http operation POST/GET router
export async function POST(request) {
  // basically controller
  const { friendshipId, messageId } = await request.json();
  try {
    const chatroom = await Chatroom.create({
      friendshipId: friendshipId,
      messageId: messageId,
    });
    return NextResponse.json(chatroom);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
