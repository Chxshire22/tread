"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
//Component imports
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";
import { useUserId } from "./GetCurrentUser";

export default function ThreadContainer({ threadId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [threadsData, setThreadsData] = useState(null);
  const [threadContentList, setThreadContentList] = useState({});
  const router = useRouter();
  const { currentUser } = useUserId();
  const currUserId = currentUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadsResponse = await axios.get(`/api/threads/${threadId}`);
        setThreadsData(threadsResponse.data[0]);
        setThreadContentList(threadsResponse.data[0].Threads_Contents);
      } catch (error) {
        console.log(`fetch error`, error);
      }
    };

    fetchData();
  }, [threadId]);

  const handleClick = (e, threadContentId) => {
    e.preventDefault();
    const newPath = `/threads/${threadId}/${threadContentId}`;
    router.push(newPath);
  };

  const handleSaveThread = async () => {
    try {
      const responseSavedThread = await axios.post(`/api/saved-threads`, {
        userId: currUserId,
        threadId: threadsData.id,
      });
      console.log(responseSavedThread)
      alert("Thread saved!");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  }

  return (
    <div
      style={{ backgroundColor: "lightblue", padding: "1rem", margin: "1rem" }}
    >
      <HeadThread thread={threadsData} />
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
      <button style={{ marginInline: "1rem" }} onClick={handleSaveThread}>Save Thread</button>
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
                <ThreadContent threadContentId={threadContent.id} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
