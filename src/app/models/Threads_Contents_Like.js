import sequelize from "../config/sequelize";
import { Model, DataTypes } from "sequelize";

class Threads_Contents_Like extends Model {}

Threads_Contents_Like.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    threadsContentsId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "threads_contents",
        key: "id",
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
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
    modelName: "Threads_Contents_Like",
    tableName: "threads_contents_likes",
    underscored: true,
  }
);

export default Threads_Contents_Like;