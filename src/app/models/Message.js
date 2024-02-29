import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Message extends Model {
  static associate(models) {
    this.belongsToMany(models.User, { through: "Chatroom" });
  }
}
Message.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    viewed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    modelName: "Message",
    underscored: true,
  }
);

export default Message;
