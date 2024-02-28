"use client";

import React from "react";
import { useState } from "react";
import ThreadList from "./ThreadList";
import HeadThread from "./HeadThread";

export default function ThreadContainer() {
  const [headThread, setHeadThread] = useState({
    id: 0,
    content: "Japan Trip",
  });
  const [threads, setThreads] = useState([
    {
      id: 1,
      content: "Day 1",
    },
    {
      id: 2,
      content: "Day 2",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
      <HeadThread content={headThread.content} />
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
      {isOpen && <ThreadList threads={threads} />}
    </div>
  );
}
