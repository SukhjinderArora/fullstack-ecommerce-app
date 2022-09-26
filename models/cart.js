const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = require('./user');

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Cart;
