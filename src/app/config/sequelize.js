import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: "postgres",
  password: "7W8DYHxIZAUi",
  database: "verceldb",
  host: "ep-shiny-thunder-a1hfeoh5-pooler.ap-southeast-1.aws.neon.tech",
  dialect: "postgres",
  dialectModule: require("pg"),
  benchmark: true,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
