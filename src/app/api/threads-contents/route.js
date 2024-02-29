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
  const { threadId, location, description } = await request.json();
  console.log(description)
  try {
    const threads_content = await Threads_Content.create({
      threadId: threadId,
      location: location,
      description: description,
    });
    return NextResponse.json(threads_content);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}