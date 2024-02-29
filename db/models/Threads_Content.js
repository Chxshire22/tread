"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Threads_Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Thread);
      this.belongsToMany(models.User, {
        through: "Thread_Contents_Comment",
      });
      this.belongsToMany(models.User, {
        through: "Thread_Contents_Like",
      });
      this.hasMany(models.Threads_Content_Display_Picture);
      this.belongsToMany(models.Category, { through: "Threads_Contents_Category" });
    }
  }
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
      recommended_time: {
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
      underscored: true,
    }
  );
  return Threads_Content;
};
