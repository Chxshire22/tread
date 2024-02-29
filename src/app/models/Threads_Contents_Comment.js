import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Threads_Contents_Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.Threads_Content);
  }
}
Threads_Contents_Comment.init(
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
    comment: {
      allowNull: false,
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
    modelName: "Threads_Contents_Comment",
    tableName: "threads_contents_comments",
    underscored: true,
  }
);

export default Threads_Contents_Comment;
