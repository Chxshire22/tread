import React from "react";
import Image from "next/image";
import { GeoAlt } from "react-bootstrap-icons";

export default function HeadThread({ content, userDp }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        marginBottom: "20px",
        backgroundColor: "white",
        padding: "10px",
        margin: "1rem",
        color: "black",
        width: "80vw",
        height: "320px",
        border: "2px black solid",
      }}
    >
      <div style={{ display: "flex", padding: "5px" }}>
        <img src={userDp} width="50" height="50" alt="User Image" />
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Ben
        </div>
      </div>
      <div style={{ textAlign: "center" }}>Title: {content.title}</div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <img src={content.threadsDp} width="180" height="120" />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <GeoAlt />
        <p>{content.destination}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <p>Start: {content.startDate}</p>
        <p>End: {content.endDate}</p>
      </div>
    </div>
  );
}
