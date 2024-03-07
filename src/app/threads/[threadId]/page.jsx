//Components Import
import ThreadContainer from "@/components/ThreadContainer";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";

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
      username userDP
      <ThreadContainer threadId={params.threadId} />
    </div>
  );
}
