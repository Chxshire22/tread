"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Threads_Contents_Display_Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Threads_Content)
    }
  }
  Threads_Contents_Display_Picture.init(
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
      url: {
        allowNull: false,
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
      modelName: "Threads_Contents_Display_Picture",
      underscored: true,
    }
  );
  return Threads_Contents_Display_Picture;
};
