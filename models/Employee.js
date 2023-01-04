const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class Employee extends Model {}

Employee.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    jobs: DataTypes.STRING,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Employee",
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Employee;