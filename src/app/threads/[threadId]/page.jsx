"use client";
//Components Import
import ThreadContainer from "@/components/ThreadContainer";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { CreateThreadContentButton } from "@/components/Buttons";

export default function page({ params }) {
  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PageHeaderWithBackBtn title={"Threads"} />
      <ThreadContainer threadId={params.threadId} />
      <CreateThreadContentButton threadId={params.threadId} />
    </div>
  );
}
