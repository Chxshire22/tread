import { NextResponse } from "next/server";
import { Saved_Thread, Thread } from "@/app/models";

export async function GET(res, { params: { userId } }) {
  try {
    const savedThreads = await Saved_Thread.findAll({
      where: { userId: userId },
      include: [Thread]
    });
    return NextResponse.json(savedThreads);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
