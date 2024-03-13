"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import HeadThread from "./HeadThread";
import Link from "next/link";

export default function SavedThreads({ username }) {
  const [savedThreadsArray, setSavedThreadsArray] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/api/user/${username}`);
        const userId = userData.data.id;
        setUserId(userId);
        const savedThreadsResponse = await axios.get(
          `/api/saved-threads/${userId}`
        );
        setSavedThreadsArray(savedThreadsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {console.log(savedThreadsArray)}
      {savedThreadsArray
        .slice()
        .reverse()
        .map((thread) => (
          <HeadThread key={thread.threadId} thread={thread.Thread} />
        ))}
    </div>
  );
}
