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
  socket.emit("connection", "test");

  socket.on("test2", (data) => {
    console.log(data);
    socket.emit("responseEvent", "Hello Client!");
  }); 

});

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
