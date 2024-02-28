import React from "react";
import ThreadContainer from "@/components/Threads/ThreadContainer";

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
      <ThreadContainer />
    </div>
  );
}
