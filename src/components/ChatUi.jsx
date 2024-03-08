"use client";

import { useEffect, useRef, useState } from "react";
import { CardImage, SendFill, XCircleFill } from "react-bootstrap-icons";
import { io } from "socket.io-client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { useUserId } from "@/components/GetCurrentUser";
import { imgOptimization } from "@/utils/imageOptimization";

export default function ChatUi({ chatId }) {
  // Data to set up the page
  const [messagesArr, setMessagesArr] = useState([]);
  const [socketState, setSocketState] = useState();
  const { currentUser } = useUserId();
  useEffect(() => {
    if (currentUser) {
      setSendMessageData((prev) => {
        return { ...prev, senderId: currentUser.id };
      });
    }
  }, [currentUser]);

  const lastMessageRef = useRef(null);
  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Data to send to the server
  const [preview, setPreview] = useState(null);
  const [sendMessageData, setSendMessageData] = useState({
    senderId: null,
    content: "",
    imageUrl: "",
    viewed: false,
    chatroomId: chatId,
    createdAt: new Date(),
  });

  // get friendship id from params

  // initiate socket connection

  useEffect(() => {
    const socket = io(`http://localhost:5000`);
    setSocketState(socket);
    const handleConnect = () => {
      console.log("connected");
    };
    socket.on("connect", handleConnect);

    socket.emit("joinRoom", `${chatId}`);
    socket.on("connection", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  // listen for messages
  useEffect(() => {
    socketState?.on("message", (message) => {
      console.log(message);
      console.log(`this is the message ${message.content}`);
      setMessagesArr((prev) => {
        return [...prev, message];
      });
    });
  }, [socketState]);

  useEffect(() => {
    console.log(messagesArr);
    scrollToBottom();
  }, [messagesArr]);

  // send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (sendMessageData.content === "" && sendMessageData.imageUrl === "")
      return;
    socketState.emit("sendMessage", sendMessageData);
    console.log("sent");
    setSendMessageData((prev) => {
      return { ...prev, imageUrl: "", content: "" };
    });
  };

  // handle image change
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
      {!currentUser ? (
        <p>loading</p>
      ) : (
        <>
          <div className="page-container">
            <PageHeaderWithBackBtn title="Chat" />

            {/* MESSAGES CONTAINER */}
            <ul className="message-container">
              {messagesArr.map((message, index) => {
                return (
                  <li
                    key={index}
                    className={`message-bubble ${
                      message.senderId == currentUser.id
                        ? "bubble-left"
                        : "bubble-right"
                    }`}
                  >
                    <p>{message.content}</p>
                  </li>
                );
              })}
              <li ref={lastMessageRef}></li>
            </ul>

            <div className="spacer"></div>
          </div>

          {/* Send Message Bar  */}
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
                autoFocus
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
      )}
    </>
  );
}
