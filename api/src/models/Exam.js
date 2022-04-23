const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('exam', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentName: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    // Este no deberia ser necesario
    teacherName:{
        type: DataTypes.STRING,
    },
    
    score:{
        //aca puede ser el codigo o el id de la materia
        type: DataTypes.INTEGER
    },
    //en realidad esto tampoco hace falta
    date:{
        type: DataTypes.DATE
    }
  });
};
