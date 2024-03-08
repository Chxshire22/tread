const { Server } = require("socket.io");
const createserver = require("http").createServer;


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

  socket.on("sendMessage", sendMessageData=>{
    console.log(sendMessageData);
    io.to(sendMessageData.chatroomId).emit("message", sendMessageData);
  })
});

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
