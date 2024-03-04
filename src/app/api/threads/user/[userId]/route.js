import Thread from "@/app/models/Thread";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(res, { params: { userId } }) {
  try {
    const userThreads = await Thread.findAll({
      where: { userId: userId },
    });
    if (!userThreads) {
      return NextResponse.json({ error: true, msg: `user n ot found` });
    }

    return NextResponse.json(userThreads);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
