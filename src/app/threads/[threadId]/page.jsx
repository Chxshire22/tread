"use client";
//Components Import
import ThreadContainer from "@/components/ThreadContainer";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { useEffect, useState } from "react";
import { CreateThreadContentButton } from "@/components/Buttons";
import { useUserId } from "@/components/GetCurrentUser";
import axios from "axios";

export default function MainThread({ params }) {
  const { currentUser } = useUserId({});
  const [threadBelongsToUser, setThreadBelongsToUser] = useState(false);
  const currUserId = currentUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUserThreads = await axios.get(
          `/api/threads/user/${currUserId}`
        );
        const arrayUserThreadId = responseUserThreads.data.map((userThread) => {
          return userThread.id;
        });
        setThreadBelongsToUser(
          arrayUserThreadId.includes(Number(params.threadId))
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currUserId]);

  return (
    <div>
      <PageHeaderWithBackBtn title={"Threads"} />
      <ThreadContainer threadId={params.threadId} />
      {console.log(threadBelongsToUser)}
      {threadBelongsToUser && (
        <CreateThreadContentButton threadId={params.threadId} />
      )}
      .
    </div>
  );
}
