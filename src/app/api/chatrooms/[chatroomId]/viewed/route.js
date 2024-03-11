import { NextResponse } from "next/server";
import { Chatroom, Message } from "@/app/models";


export async function PUT(request, { params: { chatroomId } }) {
  const { senderId, createdAt } = await request.json();
  console.log("here")
  try {
    const messages = await Message.update(
      { viewed: true },
      { where: { chatroomId, senderId } }
    );
    return NextResponse.json(messages);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}