import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/constants";

export default function ThreadContent({ threadContentId }) {
  const [threadContent, setThreadContent] = useState({});
  const userDp =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/1200px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg";

  //get userDp from includes user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/threads-contents/${threadContentId}`
        );
        setThreadContent(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        fontWeight: "bold",
        marginBottom: "10px",
        backgroundColor: "white",
        padding: "10px",
        color: "black",
        width: "60vw",
        border: "1px solid black",
        margin: "1rem",
      }}
    >
      <img src={userDp} width="50" height="50" alt="User Image" />
      <div>Location: {threadContent.location}</div>
      <div>Description: {threadContent.description}</div>
      <div>Recommended Time: {threadContent.recommended_time}</div>
    </div>
  );
}
