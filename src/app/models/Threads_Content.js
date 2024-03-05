import sequelize from "../config/sequelize";
import { Model, DataTypes } from "sequelize";

class Threads_Content extends Model {}

Threads_Content.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    threadId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "threads",
        key: "id",
      },
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    recommendedTime: {
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
    modelName: "Threads_Content",
    tableName: "threads_contents",
    underscored: true,
  }
);

export default Threads_Content