"use client";

import React from "react";
import ThreadContent from "@/components/ThreadContent";
import { ChatLeftFill, HeartFill } from "react-bootstrap-icons";
import Comments from "@/components/Comments";
import Likes from "@/components/Likes";

export default function FullThreadContent({ params }) {
  const { threadContentId } = params;
  const userId = 1;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ThreadContent threadContentId={threadContentId} />
        <div
          style={{
            display: "flex",
            width: "60%",
          }}
        >
          <ChatLeftFill />
          {/* Add row in notification  for likes here */}
          <HeartFill style={{ marginInline: "1rem" }} />
        </div>
        <div style={{ width: "60vw" }}>
          <Likes threadContentId={threadContentId} userId={userId} />
          <Comments threadContentId={threadContentId} userId={userId} />
        </div>
      </div>
    </div>
  );
}
