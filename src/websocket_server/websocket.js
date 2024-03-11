const { default: axios } = require("axios");
const { Server } = require("socket.io");
const createserver = require("http").createServer;

let messageToBackend = {};
let resultFromBackend = {};

const httpServer = createserver();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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
    const res = await axios.put(`/api/chatrooms/${chatroomId}/viewed`, {
      senderId,
      createdAt,
    });
    console.log("response for viewed status: ",res.data);
  } catch (error) {
    console.log("error on updating viewed status: ", error);
  }
};

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
