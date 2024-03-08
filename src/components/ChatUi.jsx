"use client";

import { useEffect, useState } from "react";
import { CardImage, SendFill, XCircleFill } from "react-bootstrap-icons";
import { io } from "socket.io-client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { useUserId } from "@/components/GetCurrentUser";
import { imgOptimization } from "@/utils/imageOptimization";

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
  const [preview, setPreview] = useState(null);
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

  const handleImageChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreview(null);
      return;
    }
    const file = e.target.files[0];

    let optimizedImg = await imgOptimization(file, 768);
    setPreview(optimizedImg);
  };

  return (
    <>
      <div className="page-container">
        <PageHeaderWithBackBtn title="Chat" />
      </div>

      <div className="message-bar-container">
        {preview && (
          <div className="message-img-preview-container">
            <div
              className="preview-img"
              style={{
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="remove-img">
                <XCircleFill
                  size={25}
                  color="#bf5464"
                  onClick={() => setPreview(null)}
                />
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="send-message-bar">
          <label htmlFor="chat-image-upload">
            {" "}
            <CardImage size={20} color="#00A0F3" />
          </label>
          <input
            type="file"
            name=""
            accept="images/*"
            id="chat-image-upload"
            onChange={handleImageChange}
          />
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
