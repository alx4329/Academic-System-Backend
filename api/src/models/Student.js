const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('student', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    // Este no deberia ser necesario
    // carrera:{
    //     type: DataTypes.STRING,
    // },
    
    approvedSubjects:{
        //aca puede ser el codigo o el id de la materia
        type: DataTypes.ARRAY(DataTypes.STRING),
    },

    //en realidad esto tampoco hace falta
    examenes:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    fileNumber:{
        type: DataTypes.STRING,
        unique: true,
      }
  });
};
