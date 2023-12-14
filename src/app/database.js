const { Sequelize, DataTypes, Model } = require("sequelize");
const {
  DATABASE_HOST,
  DATABASE_ROOT,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = require("./config");

// console.log(DATABASE_HOST, DATABASE_ROOT, DATABASE_PASSWORD, DATABASE_NAME);s
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_ROOT,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "mysql",
  }
);

module.exports = {
  sequelize,
  DataTypes,
  Model,
};
