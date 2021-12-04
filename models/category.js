const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
