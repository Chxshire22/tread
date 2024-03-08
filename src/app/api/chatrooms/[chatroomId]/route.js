import { NextResponse } from "next/server";
import { Chatroom, Message } from "@/app/models";
import { Friendship } from "@/app/models";
import { User } from "@/app/models";

export async function GET(res, {params: {chatroomId}}) {
  try {
    const chatrooms = await Chatroom.findAll({
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
              attributes: ["username", "userDpUrl"],
            },
            {
              model: User,
              as: "Receiver",
              attributes: ["username", "userDpUrl"],
            },
          ],
        },
        {
          model: Message
        }
      ],
    });
    return NextResponse.json(chatrooms);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
