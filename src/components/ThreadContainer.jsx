"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
//Component imports
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";

export default function ThreadContainer({ threadId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [threadsData, setThreadsData] = useState(null);
  const [threadContentList, setThreadContentList] = useState({});
  const router = useRouter();

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

  return (
    <div>
      <HeadThread thread={threadsData} />
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Itinerary" : "Show Itinerary"}
      </button>
      {isOpen && (
        <div style={{ display: "flex" }}>
          <div style={{ width: "10px", height: "300px", backgroundColor: "#000" }}></div>
          <div>
            {threadContentList.map((threadContent) => (
              <a href="#" onClick={(e) => handleClick(e, threadContent.id)} key={threadContent.id}>
                <ThreadContent threadContentId={threadContent.id} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
