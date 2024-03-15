"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import HeadThread from "./HeadThread";
import Link from "next/link";

export default function MainThreads({ username }) {
  const [threadsArray, setThreadsArray] = useState([]);
  const [userDp, setUserDp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usernameData = await axios.get(`/api/user/${username}`);
        const userId = usernameData.data.id;
        setUserDp(usernameData.data.userDpUrl || null); //is this supposed to be in use?
        const threadsResponse = await axios.get(`/api/threads/user/${userId}`);
        setThreadsArray(threadsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    console.log(threadsArray);
  }, [threadsArray]);

  return (
    <div>
      {threadsArray
        .slice()
        .reverse()
        .map((thread) => (
          <HeadThread key={thread.id} thread={thread} />
        ))}
    </div>
  );
}
