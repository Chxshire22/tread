import { Threads_Content, Thread, Threads_Contents_Display_Picture } from "@/app/models";
import { NextResponse } from "next/server";

export async function GET(res, { params: { threadContentId } }) {
  try {
    const user = await Threads_Content.findAll({
      where: { id: threadContentId },
      include: [Thread],
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
