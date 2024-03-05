"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;
export default function Prototype() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();
    socket.on("receive-message", (data) => {
      console.log(data);
    } );
  }


  function handleSubmit(e) {
    e.preventDefault();

    socket.emit("send-message", {
      username,
      message,
    });
  }

  return (
    <div>
      Hello
      <p>enter username</p>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        id="username-input"
        className="username-input"
      />
      <br />
      <br />
      {!!username && (
        <div>
          <form onSubmit={handleSubmit} action="">
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              name="message"
            />
          </form>
        </div>
      )}
    </div>
  );
}
