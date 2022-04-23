const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('subject', {
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
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // Este no deberia ser necesario
    // carreras: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
     
    // },
    toCourse: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    
    toTakeExam: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
      
    },

  });
};
