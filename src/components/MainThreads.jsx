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
        setUserDp(usernameData.data.userDpUrl || null);
        const threadsResponse = await axios.get(`/api/threads/user/${userId}`);
        setThreadsArray(threadsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {threadsArray
        .slice()
        .reverse()
        .map(
          (thread) => (
            console.log(`thread`, thread), (<HeadThread key={thread.id} thread={thread} />)
          )
        )}
      {/*  userDp={userDp} username={username} */}
      {/* {threadsArray &&
        threadsArray.map((thread) => (
          <Link href={`/threads/${thread.id}`} key={thread.id}>
            <HeadThread thread={thread} userDp={userDp} username={username} />
          </Link>
        ))} */}
    </div>
  );
}
