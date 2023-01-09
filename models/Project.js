//Lea
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Project extends Model {}

Project.init(
  {
    //name of the project
    nameProject: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    //Name of the person in charge of the project
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
      },

    //project description
    description: DataTypes.TEXT,

    //Project status (To Do, in progress, completed)
    status: {
      type: DataTypes.STRING,
      defaultValue: "To Do",
    },

     //project start date
     startDate: DataTypes.DATE,

    //project end date
    dueDate: DataTypes.DATE,

    //Project ID
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    sequelize: connection,
  }
);

module.exports = Project;
