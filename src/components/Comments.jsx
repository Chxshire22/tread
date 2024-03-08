"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/constants";

export default function Comments({ threadContentId, userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(
          `${BACKEND_URL}/api/threads-contents/comments/${threadContentId}`
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
    let response = await axios.post(`${BACKEND_URL}/api/threads-contents/comments`, {
      threadsContentsId: threadContentId,
      userId: userId,
      comment: commentInput,
    });
    setComments((prevComments) => [...prevComments, response.data]);
    setCommentInput("");
    {
      /* Add row in notification  for comments here */
    }
  };

  return (
    <div
      style={{
        backgroundColor: "lightgray",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          fontSize: "15px",
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
              User {comment.userId}: {comment.comment}
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
