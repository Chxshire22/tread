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
        border: "1px solid black",
        margin: "1rem",
      }}
    >
      <div>Location: {content.location}</div>
      <div>Description: {content.description}</div>
      <div>Recommended Time: {content.recommended_time}</div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg/1280px-Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg"
        width="180"
        height="120"
      />
    </div>
  );
}
