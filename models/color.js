const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Color = sequelize.define('color', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  color: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
});

module.exports = Color;
