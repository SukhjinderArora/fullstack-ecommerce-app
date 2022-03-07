const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Order = require('./order');

const OrderItem = sequelize.define('order_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'order_item_unique_const',
  },
  productSize: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: 'order_item_unique_const',
    set(value) {
      this.setDataValue('productSize', value.toLowerCase());
    },
  },
  productPrice: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    get() {
      const value = this.getDataValue('productPrice');
      return value === null ? null : parseFloat(value);
    },
  },
  productImg: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productVariantId: {
    type: DataTypes.INTEGER,
    unique: 'order_item_unique_const',
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    unique: 'order_item_unique_const',
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
});

module.exports = OrderItem;
