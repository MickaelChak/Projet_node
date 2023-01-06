const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Tâches extends Model {}

Tâches.init(
  {
    //nom de la tâche
    nom: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    //description de la tâche
    description: DataTypes.TEXT,

    //status de la tâche (à faire, en progression, fait)
    status: {
      type: DataTypes.STRING,
      defaultValue: "à faire",
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
