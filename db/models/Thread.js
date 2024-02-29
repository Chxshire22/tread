"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Threads_Content)
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
      start_date_of_travel: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_date_of_travel: {
        type: DataTypes.DATE,
      },
      threads_dp: {
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
      underscored: true,
    }
  );
  return Thread;
};
