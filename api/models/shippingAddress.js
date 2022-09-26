const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const ShippingAddress = sequelize.define('shippingaddress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  locality: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

module.exports = ShippingAddress;
