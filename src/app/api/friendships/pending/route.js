import { NextResponse } from "next/server";
import { Friendship, User } from "@/app/models";

export async function GET() {
  try {
    const friendships = await Friendship.findAll({
      where: {
        status: "pending",
      },
      include: [
        { model: User, as: "Requestor" },
        { model: User, as: "Receiver" },
      ],
    });
    return NextResponse.json(friendships);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
