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

    //Project status (To do, In progress, Completed)
    status: {
      type: DataTypes.STRING,
      defaultValue: "To do",
    },

     //project start date
     startDate: DataTypes.DATE,

    //project end date
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

module.exports = Project;




