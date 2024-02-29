"use client";

import styles from "../styles/chat.module.css";
import { useRouter } from "next/navigation";

function ChatroomBlock() {
  const router = useRouter();


  // POPULATE WITH CHATROOM DATA = {username, chatPreview}
  // GET ALL CHATROOMS WHERE USER IS SENDER
  // 


  return (
    <div className="chatroom-block">
      <img
        src="https://i.pinimg.com/564x/75/e9/15/75e915cd3a3495980a7cb1ea50ec039e.jpg"
        alt=""
        className="pfp-sm"
        onClick={() => router.push(`/profile/1`)}
      />
      <div
        onClick={() => router.push(`/chat/1`)}
        className="chatroom-block_content"
      >
        <h4 className="username-sm">@darryl</h4>
        <p className="chat-preview">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  );
}

export default ChatroomBlock;
