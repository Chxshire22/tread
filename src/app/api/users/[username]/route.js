import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(res, { params: { username } }) {
  try {
    const user = await User.findOne({
      where: { email: username },
    });

    if (!user) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
