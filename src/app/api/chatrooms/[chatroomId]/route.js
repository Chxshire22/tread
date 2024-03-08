import { NextResponse } from "next/server";
import { Chatroom, Message } from "@/app/models";
import { Friendship } from "@/app/models";
import { User } from "@/app/models";

export async function GET(request, { params: { chatroomId } }) {
  try {
    const chatrooms = await Chatroom.findOne({
      where: { id: chatroomId },
      attributes: ["id", "friendshipId"],
      include: [
        {
          model: Friendship,
          attributes: ["requestorId", "receiverId"],
          include: [
            {
              model: User,
              as: "Requestor",
              attributes: ["username", "userDpUrl", "id"],
            },
            {
              model: User,
              as: "Receiver",
              attributes: ["username", "userDpUrl", "id"],
            },
          ],
        },
        {
          model: Message,
        },
      ],
    });
    return NextResponse.json(chatrooms);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

