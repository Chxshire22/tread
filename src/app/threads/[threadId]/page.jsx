//Components Import
import ThreadContainer from "@/components/ThreadContainer";
import { BackButton } from "@/components/Buttons";

export default function page({ params }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BackButton />
      <ThreadContainer threadId={params.threadId} />
    </div>
  );
}
