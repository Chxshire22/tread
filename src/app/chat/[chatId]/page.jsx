import React from "react";
import ChatUi from "@/components/ChatUi";

export default async function Chatroom({ params }) {
  const { chatId } = params;
  return (
    <ChatUi chatId={chatId} />
  );
}
