import React from "react";
import ThreadContainer from "@/components/ThreadContainer";

export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Thread:</h1>
      <ThreadContainer threadId={1} />
    </div>
  );
}

Router.push(`threads/${threadId}/create-thread-content`)