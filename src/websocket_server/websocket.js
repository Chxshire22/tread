const { default: axios } = require("axios");
const { Server } = require("socket.io");
const createserver = require("http").createServer;

let messageToBackend = {};

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
    console.log("messageToBackend", messageToBackend);
    sendToBackend();
  });
});

const sendToBackend = async () => {
  const res = await axios.post("http://localhost:3000/api/messages", messageToBackend);
  console.log(res.data);
};

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
