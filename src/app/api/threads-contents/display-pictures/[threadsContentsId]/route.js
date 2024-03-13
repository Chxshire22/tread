import { NextResponse } from "next/server";
import { Threads_Contents_Display_Picture, Threads_Content } from "@/app/models";

export async function GET(res, { params: { threadsContentsId } }) {
  try {
    const threads_contents_dp = await Threads_Contents_Display_Picture.findAll({
      where: { threadsContentsId: threadsContentsId },
      include: [Threads_Content]
    });
    return NextResponse.json(threads_contents_dp);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}
