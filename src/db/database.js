const ENV = process.env.NODE_ENV || "development";

const { Sequelize } = require("sequelize");
const config = require("./config");
const sequelize = new Sequelize(config[ENV]);

module.exports = sequelize;
