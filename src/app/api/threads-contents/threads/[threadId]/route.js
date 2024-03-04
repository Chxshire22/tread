import Threads_Content from "@/app/models/Threads_Content";
import { NextResponse } from "next/server";

export async function GET(res, { params: { threadId } }) {
  try {
    const user = await Threads_Content.findAll({
      where: { threadId: threadId },
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
