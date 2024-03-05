import { User, Thread } from "@/app/models"
import { NextResponse } from "next/server";

export async function GET(res, { params: { userId } }) {
  try {
    const userThreads = await Thread.findAll({
      where: { userId: userId },
      include: [User]
    });
    if (!userThreads) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(userThreads);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
