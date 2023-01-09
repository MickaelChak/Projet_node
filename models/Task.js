//Mickael
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Task extends Model {}

Task.init(
  {
    //nom de la tâche
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    //description de la tâche
    description: DataTypes.TEXT,

    //status de la tâche (To Do, In progress, Done)
    status: {
      type: DataTypes.STRING,
      defaultValue: "To Do",
    },

    //date de rendu 
    dueDate: DataTypes.DATE,

    //Id de la tâche 
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    sequelize: connection,
  }
);

module.exports = Task;
