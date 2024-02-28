import React from "react";

export default function HeadThread({ content }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        marginBottom: "20px",
        backgroundColor: "white",
        padding: "10px",
        color: "black",
        width: "40vw",
      }}
    >
      Head Thread: {content}
    </div>
  );
}
