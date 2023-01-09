//lea
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

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
  },
  {
    sequelize: connection,
  }
);

module.exports = Employee;
