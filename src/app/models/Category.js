import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static associate(models) {
    this.belongsToMany(models.Threads_Content, {
      through: "Threads_Contents_Category",
    });
  }
}

Category.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
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
    modelName: "Category",
    underscored: true,
  }
);

export default Category;
