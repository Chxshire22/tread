"use client";

import { useEffect, useState } from "react";
import ChatroomBlock from "./ChatroomBlock";
import axios from "axios";
import { useUserId } from "./GetCurrentUser";
export default function ChatroomBlockContainer() {
  const { currentUser } = useUserId();
  const [chatrooms, setChatrooms] = useState([]);

  // get all chatrooms

  useEffect(() => {
    const getChatrooms = async () => {
      const res = await axios.get(`/api/chatrooms/get-rooms/${currentUser.id}`);
      console.log(res.data);
      setChatrooms(res.data);
    };
    if (currentUser) getChatrooms();
  }, [currentUser]);

  return (
    <>
      {chatrooms
        ? chatrooms.map((chatroom) => (
            <ChatroomBlock
              key={chatroom.id}
              chatroomId={chatroom.id}
              otherUser={chatroom.otherUser}
              lastMessage={chatroom.lastMessage}
            />
          ))
        : null}
    </>
  );
}
