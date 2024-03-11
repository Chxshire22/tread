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

  /**
   * This useEffect hook is used to establish a socket connection, join a chat room, fetch chat room data, and set up cleanup logic when the component unmounts.
   *
   * At the start, it creates a socket connection to the server at 'http://localhost:5000' and sets the socket state.
   * It then sets up a listener for the 'connect' event and logs 'connected' when the event is fired.
   *
   * The socket then emits a 'joinRoom' event with the chatId as the data.
   * It also sets up a listener for the 'connection' event and logs the data received when the event is fired.
   *
   * The hook then defines an asynchronous function to fetch chat room data from the '/api/chatrooms/{chatId}' endpoint.
   * It logs the response data and sets the messages array and friendship data states with the received data.
   *
   * The function is then called to fetch the chat room data.
   *
   * In the cleanup function, the socket connection is disconnected and all listeners are removed.
   *
   * This hook runs once when the component mounts because its dependency array is empty.
   */ useEffect(() => {
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
    console.log(currentUser);
    if (currentUser) {
      setOtherUser(
        currentUser.id === friendshipData.requestorId
          ? friendshipData.Receiver
          : friendshipData.Requestor
      );
    }
  }, [friendshipData, currentUser]);

  useEffect(() => {
    if (otherUser) {
      console.log(otherUser);
    }
  }, [otherUser]);

  // this crap doesnt work wtf
  useLayoutEffect(() => {
    scrollToBottom();
  });

  /**
   * This code block contains several functions and hooks related to handling messages in a chat application.
   *
   * observer is a ref that will be used to store an IntersectionObserver instance.
   *
   * messageRef is a callback that is invoked with a DOM node. It creates an IntersectionObserver that watches the node and, when the node intersects with the viewport, retrieves the message's timestamp, sends it to the backend to update the viewed status, and then disconnects the observer.
   *
   * updateViewedBackend is a function that emits an 'updateViewedStatus' event through the socket connection, sending an object containing the chat room id, the sender's id, and the message's timestamp.
   *
   * The first useEffect hook sets up a listener for the 'viewedStatusUpdate' event on the socket connection. When the event is fired, it logs the data received and updates the frontend with the viewed message data.
   *
   * updateFrontEnd is a function that updates the messages array in the state. It maps through the array and, for the message with the same timestamp as the viewed message data, it returns a new object with the same properties as the message but with the viewed property set to true.
   *
   * The second useEffect hook sets up a listener for the 'message' event on the socket connection. When the event is fired, it adds the new message to the messages array in the state.
   */ const observer = useRef();

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

  const updateViewedBackend = (messageTimestamp) => {
    socketState.emit("updateViewedStatus", {
      chatroomId: chatId,
      senderId: otherUser?.id, // not coming up
      createdAt: messageTimestamp,
    });
  };

  // listen for viewed status update
  useEffect(() => {
    socketState?.on("viewedStatusUpdate", (viewedMessageData) => {
      console.log(viewedMessageData);
      updateFrontEnd(viewedMessageData);
    });
  }, [socketState]);

  const updateFrontEnd = (viewedMessageData) => {
    setMessagesArr((prevMessageArr) => {
      return prevMessageArr.map((message) => {
        if (message.createdAt === viewedMessageData.createdAt) {
          return { ...message, viewed: true };
        }
        return message;
      });
    });
  };

  // listen for messages
  useEffect(() => {
    socketState?.on("message", (message) => {
      setMessagesArr((prev) => {
        return [...prev, message];
      });
    });
  }, [socketState]);

  useEffect(() => {
    console.log(messagesArr);
  }, [messagesArr]);

  /**
   * This asynchronous function handles the sending of a message.
   * It performs the following operations:
   * 1. Prevents the default form submission behavior.
   * 2. Checks if both the content and imageUrl of the message are empty. If they are, it returns early.
   * 3. If there is a preview image, it creates a reference to a location in the storage service using the chatId and a substring of the preview image data.
   * 4. It then uploads the preview image to the storage service and retrieves the download URL, which is stored in the imageSrc variable.
   * 5. It emits a 'sendMessage' event through the socket connection, sending an object containing the message data and the imageUrl.
   * 6. It resets the sendMessageData state to its initial state and the preview state to null.
   * 7. Finally, it scrolls to the bottom of the chat.
   *
   * @param {Event} e - The event object from the form submission event.
   */
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
