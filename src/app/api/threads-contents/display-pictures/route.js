import { NextResponse } from "next/server";
import Threads_Contents_Display_Picture from "../../../models/Threads_Contents_Display_Picture";

export async function GET() {
  try {
    const threads_contents_dp =
      await Threads_Contents_Display_Picture.findAll();
    return NextResponse.json(threads_contents_dp);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(req) {
  const { threadContentImages } = await req.json();
  try {
    const uploadthreadContentImages = await Threads_Contents_Display_Picture.bulkCreate(
      threadContentImages.map((threadContentImage) => ({
        threadContentId: threadContentImage.threadContentId,
        url: threadContentImage.url,
      }))
    );
    if (uploadthreadContentImages) console.log("images uploaded to backend");
    return NextResponse.json({success:true , msg:"images uploaded to backend"});
  } catch (err) {
    return NextResponse.json({ success: false, msg: err });
  }
}