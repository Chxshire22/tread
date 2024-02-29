import { NextResponse } from "next/server";
import User from "../../models/User";

export async function GET() {
  try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

export async function POST(request) {
  const { email, username } = await request.json();
  try {
    const user = await User.create({
      email: email,
      username: username,
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}
