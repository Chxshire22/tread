const { default: axios } = require("axios");
const { Server } = require("socket.io");
const createserver = require("http").createServer;

let messageToBackend = {};


/**
 * This code block creates an HTTP server and a new instance of a socket.io server.
 *
 * The `createserver()` function is called to create a new HTTP server, which is stored in the `httpServer` constant.
 *
 * A new instance of a socket.io server is then created with the `httpServer` as the server to attach to. The second argument to the `Server` constructor is an options object.
 *
 * The `cors` property of the options object is another object that specifies the CORS policy for the socket.io server. The `origin` property is set to '*' to allow requests from any origin, and the `methods` property is an array containing 'GET' and 'POST' to specify that these HTTP methods are allowed.
 */
const httpServer = createserver();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


/**
 * This code block sets up several event listeners on a socket.io server.
 *
 * When a new connection is established, it logs the id of the socket that connected.
 *
 * It sets up a listener for a 'test' event. When this event is fired, it logs the data received.
 *
 * It sets up a listener for a 'joinRoom' event. When this event is fired, it adds the socket to a room with the id received and logs a message indicating that a user joined the room.
 *
 * It sets up a listener for a 'sendMessage' event. When this event is fired, it emits a 'message' event to all sockets in the room with the id specified in the message data. It also assigns the message data to the messageToBackend variable and calls the sendToBackend function.
 *
 * It sets up a listener for an 'updateViewedStatus' event. When this event is fired, it calls the updateViewedStatus function with the chat room id, sender id, and message timestamp from the viewed message data. It also emits a 'viewedStatusUpdate' event to all sockets in the room with the id specified in the viewed message data.
 */
io.on("connection", async (socket) => {
  console.log(socket.id);

  socket.on("test", (data) => {
    console.log(data);
  });

  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
    console.log(`User joined room: ${chatId}`);
  });

  socket.on("sendMessage", (sendMessageData) => {
    // console.log(sendMessageData);
    io.to(sendMessageData.chatroomId).emit("message", sendMessageData);
    messageToBackend = sendMessageData;
    // console.log("messageToBackend", messageToBackend);
    sendToBackend();
  });

  socket.on("updateViewedStatus", (viewedMessageData) => {
    // console.log(viewedMessageData);
    updateViewedStatus(viewedMessageData.chatroomId, viewedMessageData.senderId, viewedMessageData.createdAt);
    io.to(viewedMessageData.chatroomId).emit(
      "viewedStatusUpdate",
      viewedMessageData
    );
  });
});

const sendToBackend = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/messages",
      messageToBackend
    );
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateViewedStatus = async (chatroomId, senderId, createdAt) => {

  console.log("chatroomId: ", chatroomId);
  console.log("senderId: ", senderId);
  console.log("createdAt: ", createdAt);
  try {
    const res = await axios.put(`http://localhost:3000/api/chatrooms/${chatroomId}/viewed`, {
      senderId: senderId,
      createdAt:createdAt,
    });
    console.log("response for viewed status: ",res.data);
  } catch (error) {
    console.log("error on updating viewed status: ", error);
  }
};

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
