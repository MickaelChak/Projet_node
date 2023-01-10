//Mickael
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Task extends Model {}

Task.init(
  {
    //name of the task
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    //task description
    description: DataTypes.TEXT,

    //task status (To Do, In progress, Completed)
    status: {
      type: DataTypes.STRING,
      defaultValue: "To do",
    },

    //due date
    dueDate: DataTypes.DATE,

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

  },
  {
    sequelize: connection,
  }
);

module.exports = Task;




