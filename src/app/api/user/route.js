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
  const { email, username, bio } = await request.json();
  try {
    const user = await User.create({
      email: email,
      username: username,
      bio: bio,
      userDpUrl:
        "https://firebasestorage.googleapis.com/v0/b/tread-c514d.appspot.com/o/profile-img%2Fdepositphotos_137014128-stock-illustration-user-profile-icon.jpg?alt=media&token=b4b2ea1f-6c73-4514-9155-a8d35f11a732",
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