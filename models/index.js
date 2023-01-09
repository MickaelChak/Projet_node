const connection = require("./db");
const User = require("./User");
const Employee = require("./Employee");
const Task = require("./Task");
const Project = require("./Project");

// Associations entre model

module.exports = {
  connection,
  User,
  Employee,
  Task,
  Project,
};
