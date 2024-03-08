import { NextResponse } from "next/server";
import { Chatroom, Message } from "@/app/models";


export async function PUT(request, { params: { chatroomId } }) {
  const { userId } = await request.json();
  console.log("here")
  try {
    const messages = await Message.update(
      { viewed: true },
      { where: { chatroomId, senderId: userId } }
    );
    return NextResponse.json(messages);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}

// export async function GET(request, { params: { chatroomId } }) {
//   try {
//     const chatrooms = await Chatroom.findOne({
//       where: { id: chatroomId },
//       attributes: ["id", "friendshipId"],
//       include: [
//         {
//           model: Message,
//         },
//       ],
//     });
//     return NextResponse.json(chatrooms);
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ error: true, msg: err });
//   }
// }
