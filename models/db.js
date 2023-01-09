const Sequelize = require("sequelize");

const DATABASE_URL =
  process.env.DATABASE_URL || "mysql://root:root@localhost:3306/Mysql";

const connection = new Sequelize(DATABASE_URL);

connection.authenticate().then(() => console.log("Database connected"));

module.exports = connection;
