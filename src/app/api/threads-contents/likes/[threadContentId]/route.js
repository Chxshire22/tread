import { NextResponse } from "next/server";
import { Threads_Contents_Like, User, Threads_Content } from "@/app/models";

export async function GET(res, { params: { threadContentId } }) {
  try {
    const user = await Threads_Contents_Like.findAll({
      where: { threadsContentsId: threadContentId },
      include: [User]
    });

    if (!user) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
