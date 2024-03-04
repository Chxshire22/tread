import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: "postgres",
  database: "capstone_tread_database",
  host: "127.0.0.1",
  dialect: "postgres",
  dialectModule: require("pg"),
  benchmark: true
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
