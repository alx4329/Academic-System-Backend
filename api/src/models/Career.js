const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('career', {
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
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    years:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }

  });
};
