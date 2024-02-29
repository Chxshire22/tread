import { NextResponse } from "next/server";
import Threads_Contents_Display_Picture from "../../../models/Threads_Contents_Display_Picture";

export async function GET() {
  try {
    const threads_contents_dp = await Threads_Contents_Display_Picture.findAll();
    return NextResponse.json(threads_contents_dp);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadsContentsId, url } = await request.json();
  try {
    const threads_contents_dp = await Threads_Contents_Display_Picture.create({
      threadsContentsId: threadsContentsId,
      url: url,
    });
    return NextResponse.json(threads_contents_dp);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
