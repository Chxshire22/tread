"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
//Component imports
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";

export default function ThreadContainer({ threadId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [threadsContentData, setThreadsContentData] = useState(null);
  const [threadContentList, setThreadContentList] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadsResponse = await axios.get(`/api/threads/${threadId}`);
        setThreadsContentData(threadsResponse.data[0]);
        console.log(threadsResponse.data);
      } catch (error) {
        console.log(`fetch error`, error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/api/threads-contents/threads/${threadId}`);
  //       setThreadContentList(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleClick = (e, threadContentId) => {
  //   e.preventDefault();
  //   const newPath = `${headThread.id}/${threadContentId}`;
  //   router.push(newPath);
  // };

  return (
    <div style={{ backgroundColor: "lightblue", padding: "1rem", margin: "1rem" }}>
      <HeadThread thread={threadsContentData} />
      <div style={{ borderTop: "1px solid #000", width: "100%", height: "0px" }}></div>
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
      {/* {isOpen && (
        <div style={{ display: "flex" }}>
          <div style={{ width: "10px", height: "300px", backgroundColor: "#000" }}></div>
          <div>
            {threadContentList.map((threadContent) => (
              <a href="#" onClick={(e) => handleClick(e, threadContent.id)} key={threadContent.id}>
                <ThreadContent threadContentId={threadContent.id} userDp={userDp} />
              </a>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
