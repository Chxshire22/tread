import React from "react";
import Thread from "./Thread";

export default function ThreadList({ threads }) {
  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} content={thread.content} />
      ))}
    </div>
  );
}
