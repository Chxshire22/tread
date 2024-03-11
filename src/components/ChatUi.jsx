"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { CardImage, SendFill, XCircleFill } from "react-bootstrap-icons";
import { io } from "socket.io-client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { useUserId } from "@/components/GetCurrentUser";
import { imgOptimization } from "@/utils/imageOptimization";
import {
  ref as storageRef,
  getDownloadURL,
  uploadString,
} from "@firebase/storage";
import { storage, DB_STORAGE_CHAT_IMAGE_KEY } from "@/utils/firebase";
import axios from "axios";

export default function ChatUi({ chatId }) {
  // Data to set up the page
  const [messagesArr, setMessagesArr] = useState([]);
  const [friendshipData, setFriendshipData] = useState({}); // [requestor, receiver
  const [otherUser, setOtherUser] = useState({});
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
  const [preview, setPreview] = useState("");
  const [sendMessageData, setSendMessageData] = useState({
    senderId: null,
    content: "",
    imageUrl: "",
    viewed: false,
    chatroomId: chatId,
    createdAt: new Date(),
  });

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

    const getChatroomData = async () => {
      const res = await axios.get(`/api/chatrooms/${chatId}`);
      console.log(res.data);
      const chatroomData = res.data;
      console.log(chatroomData.Messages);
      setMessagesArr(chatroomData.Messages);
      setFriendshipData(chatroomData.Friendship);
    };
    getChatroomData();

    // update all of the other user's messages as viewed

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      setOtherUser(
        currentUser.id === friendshipData.requestorId
          ? friendshipData.Receiver
          : friendshipData.Requestor
      );
    }

  }, [friendshipData, currentUser]);

  useEffect(()=>{
    if(otherUser){
      console.log(otherUser)
    }
  },[otherUser])

  // this crap doesnt work wtf
  useLayoutEffect(() => {
    scrollToBottom();
  });

  // use intersection observer with useRef and useCallback to update messages as viewed
  const observer = useRef();

  const messageRef = useCallback(
    (node) => {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const messageTimestamp = node.getAttribute("data-message-timestamp");
          console.log(messageTimestamp);

          updateViewedBackend(messageTimestamp);
          observer.current.disconnect();
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [messagesArr, otherUser]
  );

  const updateViewedBackend =  (messageTimestamp) => { //actually what should happen is that on intersection obvservation, socket should emit an event to the server to update the message as viewed, return it to front end and then update the front end

    console.log(otherUser)
    socketState.emit("updateViewedStatus", {
      chatroomId: chatId,
      senderId: otherUser?.id, // not coming up 
      createdAt: messageTimestamp,
    })

  };

  // listen for viewed status update
  useEffect(()=>{
    
    socketState?.on("viewedStatusUpdate", (viewedMessageData) => {
      console.log(viewedMessageData)
      updateFrontEnd(viewedMessageData)
    })
  },[socketState])

const updateFrontEnd = (viewedMessageData)=>{
   setMessagesArr((prevMessageArr) => {
     return prevMessageArr.map((message) => {
       if (message.createdAt === viewedMessageData.createdAt) {
         return { ...message, viewed: true };
       }
       return message;
     });
   });
}

  // listen for messages
  useEffect(() => {
    socketState?.on("message", (message) => {
      console.log(message);
      setMessagesArr((prev) => {
        return [...prev, message];
      });
    });
  }, [socketState]);

  useEffect(() => {
    console.log(messagesArr);
  }, [messagesArr]);

  // send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (sendMessageData.content === "" && sendMessageData.imageUrl === "")
      return;
    let imageSrc = "";

    if (preview) {
      const storageRefInstance = storageRef(
        storage,
        DB_STORAGE_CHAT_IMAGE_KEY +
          `${chatId}/` +
          preview.split(",")[1].substring(4, 14)
      );
      await uploadString(storageRefInstance, preview, "data_url");
      imageSrc = await getDownloadURL(storageRefInstance);
      console.log(imageSrc);
    }
    socketState.emit("sendMessage", { ...sendMessageData, imageUrl: imageSrc });
    console.log("sent");
    setSendMessageData((prev) => {
      return { ...prev, imageUrl: "", content: "" };
    });
    setPreview(null);
    scrollToBottom();
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
                    data-message-timestamp={message.createdAt} //because the messageId is not sent to the front end when getting an emit from socket and the socket can't send back result of the post request, I will use createdAt to identify the message and update front end
                    ref={
                      message.viewed
                        ? null
                        : message.senderId === otherUser?.id
                        ? messageRef
                        : null
                    } // this hopefully sets messageRef to null if the message has been viewed
                    key={index}
                    className={`message-bubble ${
                      message.senderId == currentUser.id
                        ? "bubble-left"
                        : "bubble-right"
                    }`}
                  >
                    {message.content && <p>{message.content}</p>}
                    {message.imageUrl && (
                      <img
                        className="message-img"
                        src={message.imageUrl}
                        alt=""
                        loading="lazy"
                      />
                    )}
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
