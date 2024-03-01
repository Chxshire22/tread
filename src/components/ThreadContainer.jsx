"use client";

import React from "react";
import { useState } from "react";
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";
import { Bookmark, Heart, Share } from "react-bootstrap-icons";

export default function ThreadContainer({ headThread, threadContentList }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ backgroundColor: "lightblue", padding: "1rem", margin: "1rem" }}
    >
      <HeadThread content={headThread} />
      <div
        style={{ borderTop: "1px solid #000", width: "100%", height: "0px" }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "5px",
          margin: "1rem",
        }}
      >
        <Heart />
        <Bookmark />
        <Share />
      </div>
      <div
        style={{ borderTop: "1px solid #000", width: "100%", height: "0px" }}
      ></div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginBottom: "10px",
          backgroundColor: "lightgray",
          padding: "1rem",
          color: "black",
          fontSize: "1rem",
          marginTop: "10px",
        }}
      >
        {isOpen ? "Hide Itinerary" : "Show Itinerary"}
      </button>
      {isOpen && (
        <div style={{ display: "flex" }}>
          <div
            style={{ width: "10px", height: "300px", backgroundColor: "#000" }}
          ></div>
          <div>
            {threadContentList.map((threadContent) => (
              <ThreadContent key={threadContent.id} content={threadContent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
