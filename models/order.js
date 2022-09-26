const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = require('./user');
const ShippingAddress = require('./shippingAddress');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  shippingaddressId: {
    type: DataTypes.INTEGER,
    references: {
      model: ShippingAddress,
      key: 'id',
    },
    allowNull: false,
  },
  razorpayOrderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deliveryPrice: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    defaultValue: 0,
    get() {
      const value = this.getDataValue('deliveryPrice');
      return value === null ? null : parseFloat(value);
    },
  },
});

module.exports = Order;
