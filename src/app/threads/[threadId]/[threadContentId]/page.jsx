import React from "react";
import ThreadContent from "@/components/ThreadContent";
import { Chat, HeartFill } from "react-bootstrap-icons";
import { ChatLeftFill } from "react-bootstrap-icons";

export default function FullThreadContent() {
  const threadContent = {
    id: 1,
    location: "Tokyo",
    description: "Fun",
    recommended_time: "2pm",
  };

  //axios call to get threadContent by threadContentId
  //axios call to get comments and likes 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ThreadContent content={threadContent} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "60%",
        }}
      >
        <HeartFill />
        <ChatLeftFill />
      </div>
    </div>
  );
}
