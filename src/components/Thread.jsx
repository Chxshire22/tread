import React from "react";

export default function Thread({ content }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        marginBottom: "10px",
        backgroundColor: "white",
        padding: "10px",
        color: "black",
        width: "40vw",
      }}
    >
      {content}
    </div>
  );
}
