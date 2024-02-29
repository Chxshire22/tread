import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Saved_Thread extends Model {
  static associate(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.Thread);
  }
}
Saved_Thread.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    threadId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "threads",
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
    modelName: "Saved_Thread",
    tableName: "saved_threads",
    underscored: true,
  }
);

export default Saved_Thread;