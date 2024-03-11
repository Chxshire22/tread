import sequelize from "../config/sequelize";
import { Model, DataTypes } from "sequelize";

class Chatroom extends Model {}
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
