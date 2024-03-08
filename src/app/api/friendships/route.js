import { NextResponse } from "next/server";
import { Friendship, User } from "@/app/models";

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

export async function PUT(request) {
  const { friendshipId, newStatus } = await request.json();
  try {
    const updatedFriendship = await Friendship.update(
      {
        status: newStatus,
      },
      {
        where: {
          id: friendshipId
        }
      }
    );
    return NextResponse.json(updatedFriendship);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
