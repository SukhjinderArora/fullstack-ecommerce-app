const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = require('./user');

const Token = sequelize.define('token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  refreshToken: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  xsrfToken: {
    type: DataTypes.STRING(48),
    unique: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  expirationTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Token;
