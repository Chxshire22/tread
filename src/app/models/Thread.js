import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Thread extends Model {
  static associate(models) {
    this.belongsTo(models.User);
    this.hasMany(models.Threads_Content);
    this.belongsToMany(models.User, {
      through: "Saved_Thread",
    });
  }
}
Thread.init(
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
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    destination: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    startDateOfTravel: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    endDateOfTravel: {
      type: DataTypes.DATE,
    },
    threadsDp: {
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
    modelName: "Thread",
    tableName: "threads",
    underscored: true,
  }
);

export default Thread;
