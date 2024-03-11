import { NextResponse } from "next/server";
import { Notification } from "@/app/models";

export async function GET() {
  try {
    const notifications = await Notification.findAll();
    return NextResponse.json(notifications);
  } catch (err) {
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { userId, type, content, viewed, threadsContentsId, gotoUrl } =
    await request.json();
  try {
    const notification = await Notification.create({
      userId: userId,
      type: type,
      content: content,
      viewed: viewed,
      threadsContentsId: threadsContentsId,
      gotoUrl: gotoUrl
    });
    return NextResponse.json(notification);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}

export async function PUT(request) {
  const { notificationId, viewed } =
    await request.json();
  try {
    const updatedNotification = await Notification.update(
      {
        viewed: viewed,
      },
      {
        where: {
          id: notificationId,
        },
      }
    );

    if (!updatedNotification) {
      return NextResponse.status(404).json({
        error: true,
        msg: "Notification not found.",
      });
    }

    return NextResponse.json(updatedNotification);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err.message });
  }
}
