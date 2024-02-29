import { NextResponse } from "next/server";
import Thread from "../../models/Thread";

export async function GET() {
  try {
    const threads = await Thread.findAll();
    return NextResponse.json(threads);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const {
    userId,
    title,
    destination,
    startDateOfTravel,
    endDateOfTravel,
    threadsDp,
  } = await request.json();
  try {
    const thread = await Thread.create({
      userId,
      title,
      destination,
      startDateOfTravel,
      endDateOfTravel,
      threadsDp
    });
    return NextResponse.json(thread);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
