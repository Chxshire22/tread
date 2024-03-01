import React from "react";
import Link from "next/link";
import ThreadContainer from "@/components/ThreadContainer";

export default function page() {
  const headThread = {
    id: 1,
    title: "EOY Trip with Family",
    destination: "Japan",
    startDate: "Dec 2023",
    endDate: "Jan 2024",
  };
  const threadContentList = [
    {
      id: 1,
      location: "Tokyo",
      description: "Fun",
      recommended_time: "2pm",
    },
    {
      id: 2,
      location: "Osaka",
      description: "Not Fun",
      recommended_time: "3pm",
    },
  ];

  //API for thread based on threadID

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Profile Stuff</h1>
      <ThreadContainer
        headThread={headThread}
        threadContentList={threadContentList}
      />
    </div>
  );
}

Router.push(`threads/${threadId}/create-thread-content`)