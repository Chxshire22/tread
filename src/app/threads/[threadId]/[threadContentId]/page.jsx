"use client";
import { ChatLeftFill, HeartFill } from "react-bootstrap-icons";
import Comments from "@/components/Comments";
import Likes from "@/components/Likes";
import ThreadContent from "@/components/ThreadContent";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import axios from "axios";
import { useUserId } from "@/components/GetCurrentUser";
import { useEffect, useState } from "react";

export default function FullThreadContent({ params }) {
  const { currentUser } = useUserId({});
  const [ThreadsContentUserId, setThreadsContentUserId] = useState();
  const threadsContentsId = params.threadContentId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseThreadsContents = await axios.get(
          `/api/threads-contents/${params.threadContentId}`
        );
        setThreadsContentUserId(responseThreadsContents.data[0].Thread.userId);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleLike = async () => {
    try {
      await axios.post(`/api/threads-contents/likes`, {
        threadsContentsId: threadsContentsId,
        userId: currentUser.id,
      });
      const response = await axios.post("/api/notifications", {
        userId: ThreadsContentUserId,
        type: "like",
        content: `${currentUser.username} liked your post`,
        viewed: false,
        threadsContentsId: threadsContentsId,
        gotoUrl: `${window.location.origin}/threads/${params.threadId}/${params.threadContentId}`,
      });
      console.log(response.data);
      alert("Liked!");
    } catch (error) {
      console.error("Error sending like notification:", error);
      alert("Failed to send like.");
    }
  };

  return (
    <div className="page-container">
      {currentUser ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PageHeaderWithBackBtn title={"Threads"} />
          <ThreadContent threadContentId={params.threadContentId} />
          <div
            style={{
              display: "flex",
              width: "60%",
            }}
          >
            <ChatLeftFill />
            <HeartFill style={{ marginInline: "1rem" }} onClick={handleLike} />
          </div>
          <div style={{ width: "60vw", margin: "1rem" }}>
            <Likes threadContentId={params.threadContentId} />
            <Comments
              threadId={params.threadId}
              threadContentId={params.threadContentId}
              ThreadsContentUserId={ThreadsContentUserId}
              currentUser={currentUser}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
