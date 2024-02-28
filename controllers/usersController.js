class UsersController {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.usersModel.findAll();
      res.json(users);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createUser(req, res) {
    const { email, username } = req.body;
    try {
      const user = await this.usersModel.create({
        email: email,
        username: username,
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
