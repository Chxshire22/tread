"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/constants";

export default function Comments({
  threadId,
  threadContentId,
  ThreadsContentUserId,
  currentUser,
}) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(
          `/api/threads-contents/comments/${threadContentId}`
        );
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let responseComment = await axios.post(`/api/threads-contents/comments`, {
        threadsContentsId: threadContentId,
        userId: currentUser.id,
        comment: commentInput,
      });
      setComments((prevComments) => [...prevComments, responseComment.data]);
      setCommentInput("");
      const responseNotification = await axios.post("/api/notifications", {
        userId: ThreadsContentUserId,
        type: "comment",
        content: `${currentUser.username} commented on your post`,
        viewed: false,
        threadsContentsId: threadContentId,
        gotoUrl: `${window.location.origin}/threads/${threadId}/${threadContentId}`,
      });
      alert("Comment sent to backend!");
    } catch (error) {
      console.error("Error sending like notification:", error);
      alert("Failed to send like.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        padding: "10px",
        width: "83vw",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Comments:
      </div>
      <div>
        {comments.map((comment, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <div style={{ fontSize: "16px", color: "#555" }}>
              {comment.User.username}: {comment.comment}
            </div>
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={commentInput} onChange={handleInputChange} />
        <button onClick={handleSubmit} className="mx-2">
          Submit
        </button>
      </div>
    </div>
  );
}
