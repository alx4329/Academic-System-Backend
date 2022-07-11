const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

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
    surname:{
      type:DataTypes.STRING,
      allowNull:false
    },
    dni: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    approvedSubjects:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    examenes:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    fileNumber:{
        type: DataTypes.STRING,
        unique: true,
      }
  });
};
