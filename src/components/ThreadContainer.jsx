"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
//Component imports
import ThreadContent from "./ThreadContent";
import HeadThread from "./HeadThread";
import { useUserId } from "./GetCurrentUser";
import { PersonCircle } from "react-bootstrap-icons";

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
      console.log(responseSavedThread);
      alert("Thread saved!");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div>
      <a
        className="btn btn-sm btn-outline-secondary "
        style={{ color: "#1d4886" }}
        href={`/user/${threadsData?.User?.username}`}
      >
        <PersonCircle className="personcircle" /> {threadsData?.User?.username}
      </a>
      <HeadThread thread={threadsData} />
      {threadContentList && threadContentList.length > 1 && (
        <button className="btn btn-primary itinerary-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide Itinerary" : "Show Itinerary"}
        </button>
      )}
      {isOpen && (
        <div style={{ display: "flex" }}>
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
