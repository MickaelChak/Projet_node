const connection = require("./db");
const User = require("./User");
const Employee = require("./Employee");
const Taches = require("./Tâches");

// Associations entre model

module.exports = {
  connection,
  User,
  Employee,
  Taches,
};
