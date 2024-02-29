import React from "react";

export default function ThreadContent({ content }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        marginBottom: "10px",
        backgroundColor: "white",
        padding: "10px",
        color: "black",
        width: "60vw",
      }}
    >
      <div>Location: {content.location}</div>
      <div>Description: {content.description}</div>
      <div>Recommended Time: {content.recommended_time}</div>
    </div>
  );
}
