"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/constants";

export default function Likes({ threadContentId }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(
          `${BACKEND_URL}/api/threads-contents/likes/${threadContentId}`
        );
        setLikes(response.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "20px" }}>
      {likes} Likes
    </div>
  );
}
