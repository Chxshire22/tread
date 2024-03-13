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
  const { email, username, bio, userDpUrl } = await request.json();
  try {
    const user = await User.create({
      email: email,
      username: username,
      bio: bio,
      userDpUrl
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.status(400).json({ error: true, msg: err });
  }
}

export async function PUT(request) {
  const {id, userDpUrl} = await request.json();
  try {
    const user = await User.update({
      userDpUrl
    },{
      where:{
        id
      }
    })
    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
  }
}