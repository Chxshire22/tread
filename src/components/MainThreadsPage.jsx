"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/constants";
import HeadThread from "./HeadThread";
import Link from "next/link";

export default function MainThreadsPage({ userId }) {
  const [threads, setThreads] = useState([]);
  const userDp = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/1200px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg"
  
  //get userDp using includes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/threads/user/${userId}`
        );
        console.log(response.data)
        setThreads(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {threads &&
        threads.map((thread) => (
          <Link href={`/threads/${thread.id}`} key={thread.id}>
            <HeadThread content={thread} userDp={userDp}/>
          </Link>
        ))}
    </div>
  );
}
