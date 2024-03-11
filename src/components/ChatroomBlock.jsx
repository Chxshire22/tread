"use client";

import { useRouter } from "next/navigation";

function ChatroomBlock(props) {
  const { lastMessage, chatroomId, otherUser } = props;

  const router = useRouter();

  return (
    <div className="chatroom-block">
      <img
        src="https://i.pinimg.com/564x/75/e9/15/75e915cd3a3495980a7cb1ea50ec039e.jpg" //should be otherUser.pfp
        alt=""
        className="pfp-sm"
        onClick={() => router.push(`/user/${otherUser.username}`)}
      />
      <div
        onClick={() => router.push(`/chat/${chatroomId}`)}
        className="chatroom-block_content"
      >
        <h4 className="username-sm">@{otherUser.username}</h4>
        {lastMessage.viewed ? (
          <p className="chat-preview">{lastMessage.content}</p>
        ) : (
          <strong className="chat-preview-unread">{lastMessage.content}</strong>
        )}
      </div>
    </div>
  );
}

export default ChatroomBlock;
