import { NextResponse } from "next/server";
import { Friendship } from "@/app/models";

export async function GET() {
  try {
    const friendships = await Friendship.findAll({
      where: {
        status: "pending",
      },
    });
    return NextResponse.json(friendships);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
