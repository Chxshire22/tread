"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";
import { useRouter } from "next/navigation";

export default function ThreadContainer({threadId}) {
  const [isOpen, setIsOpen] = useState(false);
  const [headThread, setHeadThread] = useState({});
  const [threadContentList, setThreadContentList] = useState({});
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    const newPath = `${headThread.id}/1`;
    router.push(newPath);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/threads/${threadId}`
        );
        setHeadThread(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/threads-contents/threads/${threadId}`
        );
        setThreadContentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ backgroundColor: "lightblue", padding: "1rem", margin: "1rem" }}
    >
      <HeadThread content={headThread} />
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
              <a href="#" onClick={handleClick} key={threadContent.id}>
                <ThreadContent content={threadContent} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
