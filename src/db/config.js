require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
module.exports = {
  development: {
    username: "postgres",
    password: "sreekant",
    database: "taskmanagement",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "postgress",
    password: "sreekant",
    database: "taskmanagement",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
};
