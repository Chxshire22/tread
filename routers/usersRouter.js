const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.userController = controller;
  }
  routes() {
    router.get("/", this.userController.getAllUsers.bind(this.userController));
    router.post("/", this.userController.createUser.bind(this.userController));
    return router;
  }
}
module.exports = UsersRouter;
