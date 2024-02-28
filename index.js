const cors = require("cors");
const express = require("express");
require("dotenv").config();

const db = require("./db/models/index");
const { User } = db;

const UsersRouter = require("./routers/usersRouter");
const UsersControllers = require("./controllers/usersController");
const usersControllers = new UsersControllers(User);
const usersRouter = new UsersRouter(usersControllers).routes();

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
