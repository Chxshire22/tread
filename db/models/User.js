"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Thread);
      this.belongsToMany(models.Threads_Content, {
        through: "Thread_Contents_Comment",
      });
      this.belongsToMany(models.Threads_Content, {
        through: "Thread_Contents_Like",
      });
      this.belongsToMany(models.Thread, {
        through: "Saved_Thread",
      });
      this.hasMany(models.Notification);
      this.hasMany(models.Message);
      this.hasMany(models.Friendship, {
        as: "Requestor",
        foreignKey: "requestorId",
      });
      this.hasMany(models.Friendship, {
        as: "Receiver",
        foreignKey: "receiverId",
      });
    }
  }
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
      underscored: true,
    }
  );
  return User;
};
