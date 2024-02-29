import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Threads_Contents_Category extends Model {
  static associate(models) {
    this.belongsTo(models.Category);
    this.belongsTo(models.Threads_Content);
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
    tableName: "threads_contents_categories",
    underscored: true,
  }
);

export default Threads_Contents_Category;
