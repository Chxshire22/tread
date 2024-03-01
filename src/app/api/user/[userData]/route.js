import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(res, { params: { userData } }) {
  try {
    let user;

    if (userData.includes("@")) {
      user = await User.findOne({
        where: { email: userData },
      });
    } else {
      user = await User.findOne({
        where: { username: userData },
      });
    }

    if (!user) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
