"use client";
//Components Import
import ThreadContainer from "@/components/ThreadContainer";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { CreateThreadContentButton } from "@/components/Buttons";
import Navbar from "@/components/Navbar";

export default function page({ params }) {
  return (
    <>
      <div className="page-container">
        <PageHeaderWithBackBtn title={"Threads"} />
        <ThreadContainer threadId={params.threadId} />
        <CreateThreadContentButton threadId={params.threadId} />
      </div>
      <Navbar />
    </>
  );
}
