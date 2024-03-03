import { NextResponse } from "next/server";
import User from "../../../models/User";

export async function GET(request, {params: {userEmail}}) {
  console.log(userEmail)
  try {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
