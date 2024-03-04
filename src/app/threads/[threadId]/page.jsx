import React from "react";
import ThreadContainer from "@/components/ThreadContainer";

export default function page({params}) {
  const { threadId } = params;
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Profile Stuff</h1>
      <ThreadContainer threadId={threadId}
      />
    </div>
  );
}
