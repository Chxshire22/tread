"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/constants";

export default function ThreadContainer({ threadId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [headThread, setHeadThread] = useState({});
  const [threadContentList, setThreadContentList] = useState({});
  const router = useRouter();
  
  const handleClick = (e, threadContentId) => {
    e.preventDefault();
    const newPath = `${headThread.id}/${threadContentId}`;
    router.push(newPath);
  };
  
  const userDp =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/1200px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg";

  //get userDp from includes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/threads/${threadId}`
        );
        setHeadThread(response.data[0]);
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
      <HeadThread content={headThread} userDp={userDp} />
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
              <a
                href="#"
                onClick={(e) => handleClick(e, threadContent.id)}
                key={threadContent.id}
              >
                <ThreadContent
                  threadContentId={threadContent.id}
                  userDp={userDp}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
