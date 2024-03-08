import PendingRequest from "@/components/PendingRequest";
import React from "react";

export default function page({ params }) {
  return (
    <div>
      <PendingRequest username={params.username} />
    </div>
  );
}
