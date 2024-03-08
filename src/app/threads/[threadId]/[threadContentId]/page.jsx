"use client";

import { ChatLeftFill, HeartFill } from "react-bootstrap-icons";
//Component imports
import Comments from "@/components/Comments";
import Likes from "@/components/Likes";
import ThreadContent from "@/components/ThreadContent";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
export default function FullThreadContent({ params }) {
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
        <PageHeaderWithBackBtn title={"Threads"} />
        <ThreadContent threadContentId={params.threadContentId} />
        <div
          style={{
            display: "flex",
            width: "60%",
          }}
        >
          <ChatLeftFill />
          <HeartFill style={{ marginInline: "1rem" }} />
        </div>
        <div style={{ width: "60vw" }}>
          <Likes threadContentId={params.threadContentId} userId={userId} />
          <Comments threadContentId={params.threadContentId} userId={userId} />
        </div>
      </div>
    </div>
  );
}
