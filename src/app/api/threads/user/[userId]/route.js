import Thread from "@/app/models/Thread";
import { NextResponse } from "next/server";

export async function GET(res, { params: { userId } }) {
  try {
    const user = await Thread.findAll({
      where: { userId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
