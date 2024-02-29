import { NextResponse } from "next/server";
import Notification from "../../models/Notification";

export async function GET() {
  try {
    const notifications = await Notification.findAll();
    return NextResponse.json(notifications);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { userId, type, content, viewed } = await request.json();
  try {
    const notification = await Notification.create({
      userId: userId,
      type: type,
      content: content,
      viewed: viewed
    });
    return NextResponse.json(notification);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
