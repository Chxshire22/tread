"use client";

import { useRouter } from "next/navigation";

function ChatroomBlock(props) {
  const { lastMessage, chatroomId, otherUser } = props;

  const router = useRouter();

  return (
    <div className="chatroom-block">
      <img
        src={otherUser.userDpUrl} //should be otherUser.pfp
        alt=""
        className="pfp-sm"
        onClick={() => router.push(`/user/${otherUser.username}`)}
      />
      <div
        onClick={() => router.push(`/chat/${chatroomId}`)}
        className="chatroom-block_content"
      >
        <h4 className="username-sm">@{otherUser.username}</h4>
        { lastMessage? (lastMessage.viewed ? (
          <p className="chat-preview">{lastMessage.content}</p>
        ) : (
          <strong className="chat-preview-unread">{lastMessage.content}</strong>
        )):null}
      </div>
    </div>
  );
}

export default ChatroomBlock;
