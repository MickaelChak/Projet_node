const connection = require("./db");
const User = require("./User");
const Employee = require("./Employee");
const Taches = require("./Tâches");
const Project = require("./Project");

// Associations entre model

module.exports = {
  connection,
  User,
  Employee,
  Taches,
  Project,
};
