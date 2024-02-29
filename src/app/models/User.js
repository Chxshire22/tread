import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
    this.hasMany(models.Thread);
    this.hasMany(models.Threads_Contents_Comment);
    this.hasMany(models.Threads_Contents_Like);
    this.hasMany(models.Saved_Thread);
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

User.init({
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
