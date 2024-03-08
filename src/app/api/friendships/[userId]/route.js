import { NextResponse } from "next/server";
import { Friendship, User } from "@/app/models";
import { Op } from "sequelize";

export async function GET(req, { params: { userId } }) {
  try {
    const friendships = await Friendship.findAll({
      where: {
        [Op.or]: [{ requestorId: userId }, { receiverId: userId }],
      },
      include: [
        { model: User, as: "Requestor" },
        { model: User, as: "Receiver" }
      ],
    });
    return NextResponse.json(friendships);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err.message });
  }
}
