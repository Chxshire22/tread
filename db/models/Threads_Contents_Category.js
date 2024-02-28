"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Threads_Contents_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Threads_Content, {
        through: "Threads_Contents_Category",
      });
    }
  }
  Threads_Contents_Category.init(
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
      categoriesId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
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
      modelName: "Threads_Contents_Category",
      underscored: true,
    }
  );
  return Threads_Contents_Category;
};
