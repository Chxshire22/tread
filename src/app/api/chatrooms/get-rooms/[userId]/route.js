import { NextResponse } from "next/server";
import { Chatroom, Message } from "@/app/models";
import { Friendship } from "@/app/models";
import { Op } from "sequelize";
import { User } from "@/app/models";

export async function GET(request, { params: { userId } }) {
  try {
    const chatrooms = await Chatroom.findAll({
      include: [
        {
          model: Friendship,
          // attributes: ["requestorId", "receiverId"],
          where: {
            [Op.or]: [{ requestorId: userId }, { receiverId: userId }],
          },

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
          limit: 1,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    // clean up the API response

    const cleanResponse = chatrooms.map((chatroom) => {
      const otherUser =
        chatroom.Friendship.requestorId === Number(userId)
          ? chatroom.Friendship.Receiver
          : chatroom.Friendship.Requestor;

          console.log(chatroom.Friendship)
      return {
        id: chatroom.id,
        otherUser: {
          id: otherUser.id,
          username: otherUser.username,
          userDpUrl: otherUser.userDpUrl,
        },
        lastMessage: chatroom.Messages[0],
      };
    });

    return NextResponse.json(cleanResponse);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
