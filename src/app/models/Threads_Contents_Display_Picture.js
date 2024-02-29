import sequelize from "../config/sequelize";
const { Model, DataTypes } = require("sequelize");

class Threads_Contents_Display_Picture extends Model {
  static associate(models) {
    this.belongsTo(models.Threads_Content);
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
    tableName: "threads_contents_display_pictures",
    underscored: true,
  }
);

export default Threads_Contents_Display_Picture;
