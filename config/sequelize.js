const config = require("./database");
const Sequelize = require("sequelize");

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
    pool: {
      min: 1,
      max: 5,
      acquire: 30000,
      idle: 60000,
    },
  }
);