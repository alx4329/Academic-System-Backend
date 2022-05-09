const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('Admin', 'Docente', 'Estudiante'),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Este no deberia ser necesario
    // carreras: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
     
    // },
    email:{
      type: DataTypes.STRING,
      unique: true,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true
      
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }



  });
};