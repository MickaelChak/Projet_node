const connection = require("./db");
const User = require("./User");
const Employee = require("./Employee");

// Associations entre model

module.exports = {
  connection,
  User,
  Employee,
};