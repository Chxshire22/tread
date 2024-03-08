import { NextResponse } from "next/server";
import { Notification, User } from "@/app/models";

export async function GET(req, { params: { userId } }) {
  try {
    const notifications = await Notification.findAll({
      where: {
        userId: userId
      }
    });
    return NextResponse.json(notifications);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err.message });
  }
}
