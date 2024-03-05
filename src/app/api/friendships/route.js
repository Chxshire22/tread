import { NextResponse } from "next/server";
import { Friendship } from "@/app/models";

export async function GET() {
  try {
    const friendships = await Friendship.findAll();
    return NextResponse.json(friendships);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { requestorId, receiverId, status } = await request.json();
  try {
    const friendship = await Friendship.create({
      requestorId: requestorId,
      receiverId: receiverId,
      status: status,
    });
    return NextResponse.json(friendship);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
