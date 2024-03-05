import { Threads_Content, Thread } from "@/app/models";
import { NextResponse } from "next/server";

export async function GET(res, { params: { threadId } }) {
  try {
    const user = await Threads_Content.findAll({
      where: { threadId: threadId },
      include: [Thread]
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
