import { NextResponse } from "next/server";
import Threads_Content from "../../models/Threads_Content";

export async function GET() {
  try {
    const threads_contents = await Threads_Content.findAll();
    return NextResponse.json(threads_contents);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { threadId, location, description, time } = await request.json();
  console.log(description)
  try {
    const threadsContent = await Threads_Content.create({
      threadId: threadId,
      location: location,
      description: description,
      recommendedTime: time
    });
    return NextResponse.json(threadsContent);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}