const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Size = sequelize.define('size', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  size: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('size', value.toLowerCase());
    },
  },
});

module.exports = Size;
