"use client";

import { useEffect, useState } from "react";
import { CardImage, SendFill } from "react-bootstrap-icons";
import { io } from "socket.io-client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";

export default function ChatUi({ chatId }) {
  const [buttonContent, setButtonContent] = useState("send event");

  // get friendship id from params

  const socket = io("http://localhost:5000");

  useEffect(() => {
    const handleConnect = () => {
      console.log("connected");
    };
    socket.on("connect", handleConnect);

    console.log("socket: ", socket);
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    console.log(chatId);
  }, [chatId]);

  socket.on("connection", (data) => {
    console.log(data);
  });

  socket.on("responseEvent", (data) => {
    setButtonContent(`received response from server ${data}`);
    console.log(data);
  });

  const sendSocketEvent = () => {
    // console.log("test2");
    socket.emit("test2", "Hello, Server!"); //name of event, then data to send to server
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("sent");
  };

  return (
    <>
      <div className="page-container">
        <PageHeaderWithBackBtn title="Chat" />
        {/* this is for me to test if the socket is still working */}
        {/* <button onClick={() => sendSocketEvent()}>{buttonContent}</button> */}
      </div>

      <div className="message-bar-container">
        {/* <div className="message-img-preview-container">
          <img
            src="https://i.pinimg.com/236x/ce/e4/20/cee4208fc79d2a00489155c71236e1d1.jpg"
            alt=""
            className="preview-img"
          />
        </div> */}
        <form onSubmit={handleSendMessage} className="send-message-bar">
          <label htmlFor="chat-image-upload">
            {" "}
            <CardImage size={20} color="#00A0F3" />{" "}
          </label>
          <input type="file" name="" accept="images/*" id="chat-image-upload" />
          <input type="text" placeholder="Send message" />
          <button>
            {" "}
            <SendFill color="#00A0F3" size={20} />{" "}
          </button>
        </form>
      </div>
    </>
  );
}
