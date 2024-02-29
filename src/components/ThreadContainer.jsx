"use client";

import React from "react";
import { useState } from "react";
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";

export default function ThreadContainer({ headThread, threadContentList }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ backgroundColor: "lightblue", padding: "1rem", margin: "1rem" }}
    >
      <HeadThread content={headThread} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginBottom: "10px",
          backgroundColor: "lightgray",
          padding: "1rem",
          color: "black",
          fontSize: "1rem",
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
