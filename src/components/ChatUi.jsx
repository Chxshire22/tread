"use client";

import { useEffect, useState } from "react";
import { CardImage, SendFill } from "react-bootstrap-icons";
import { io } from "socket.io-client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { useUserId } from "@/components/GetCurrentUser";

export default function ChatUi({ chatId }) {
  // Data to set up the page
  const { currentUser } = useUserId();
  useEffect(() => {
    if (currentUser) {
      setSendMessageData((prev) => {
        return { ...prev, senderId: currentUser.id };
      });
    }
  }, [currentUser]);


  // Data to send to the server
  const [sendMessageData, setSendMessageData] = useState({
    senderId: null,
    content: "",
    imageUrl: "",
    viewed: false,
  });


  useEffect(() => {
    console.log(sendMessageData);
  }, [sendMessageData]);

  // get friendship id from params

  // initiate socket connection
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
    console.log(data);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("sent");
    socket.emit("test2", "Hello, Server!");

    setSendMessageData((prev) => {
      return { ...prev, imageUrl: "", content: "" };
    });
  };

  return (
    <>
      <div className="page-container">
        <PageHeaderWithBackBtn title="Chat" />
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
          <input
            type="text"
            placeholder="Send message"
            value={sendMessageData.content}
            onChange={(e) => {
              setSendMessageData((prev) => {
                return { ...prev, content: e.target.value };
              });
            }}
          />
          <button type="submit">
            {" "}
            <SendFill color="#00A0F3" size={20} />{" "}
          </button>
        </form>
      </div>
    </>
  );
}
