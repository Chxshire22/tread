import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { query } = req;
    const username = query?.username;

    const user = await User.findOne({
      where: { email: username },
    });

    if (!username) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: `server error` });
  }
}

// export async function GET(req) {
//   try {
//     const {
//       query: { email },
//     } = req;

//     const user = await User.findOne({
//       where: { email: email },
//     });

//     if (!user) {
//       return NextResponse.json({
//         status: 404,
//         body: { message: "User not found" },
//       });
//     }
//     return NextResponse.json(user);
//   } catch (err) {
//     return NextResponse.status(400).json({ error: true, msg: err });
//   }
// }

// export async function GET(req) {
//   try {
//     const encodedEmail = req?.query?.email;
//     const email = decodeURIComponent(encodedEmail); // Decode the encoded email

//     const user = await User.findOne({
//       where: { email: email },
//     });
//     console.log("User:", user);

//     if (!user) {
//       return NextResponse.status(404).json({ message: "User not found" });
//     }

//     return NextResponse.json(user);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.status(500).json({ error: true, msg: "Internal server error" });
//   }
// }
