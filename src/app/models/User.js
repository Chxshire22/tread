import sequelize from "../config/sequelize";
import { Model, DataTypes } from "sequelize";

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userDpUrl: {
      type: DataTypes.STRING,
    },
    verificationStatus: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    bio: {
      type: DataTypes.TEXT,
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
    modelName: "User",
    tableName: "users",
    underscored: true,
  }
);

export default User;
