import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Chatroom extends Model {
  static associate(models) {
    this.belongsTo(models.Friendship);
    this.belongsTo(models.Message);
  }
}
Chatroom.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    friendshipId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "friendships",
        key: "id",
      },
    },
    messageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "messages",
        key: "id",
      },
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
    modelName: "Chatroom",
    underscored: true,
  }
);

export default Chatroom;
