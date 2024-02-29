import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Friendship extends Model {

  static associate(models) {
    this.belongsToMany(models.Message, { through: "Chatroom" });
    this.belongsTo(models.User, {
      as: "Requestor",
      foreignKey: "requestorId",
    });
    this.belongsTo(models.User, {
      as: "Receiver",
      foreignKey: "receiverId",
    });
  }
}

Friendship.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    requestorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    receiverId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
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
    modelName: "Friendship",
    underscored: true,
  }
);

export default Friendship;
