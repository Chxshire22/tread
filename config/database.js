require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "capstone_tread_database",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
