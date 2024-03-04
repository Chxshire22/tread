import Thread from "@/app/models/Thread";
import { NextResponse } from "next/server";

export async function GET(res, { params: { threadId } }) {
  try {
    const user = await Thread.findAll({
      where: { id: threadId },
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
