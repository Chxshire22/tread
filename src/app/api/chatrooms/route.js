import { NextResponse } from "next/server";
import { Chatroom } from "@/app/models";
import { Friendship } from "@/app/models";
import { User } from "@/app/models";

export async function GET() {
  try {
    const chatrooms = await Chatroom.findAll({
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
      ],
    });
    return NextResponse.json(chatrooms);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

//filepath + http operation POST/GET router
export async function POST(request) {
  // basically controller
  const { friendshipId } = await request.json();
  try {
    const [chatroom,created] = await Chatroom.findOrCreate({
      where:{
        friendshipId
      }
    });
    return NextResponse.json(chatroom);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
