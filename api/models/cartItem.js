const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const ProductSize = require('./productSize');
const Cart = require('./cart');

const CartItem = sequelize.define('cart_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productsizeId: {
    type: DataTypes.INTEGER,
    unique: 'cart_item_unique_const',
    allowNull: false,
    references: {
      model: ProductSize,
      key: 'id',
    },
  },
  cartId: {
    type: DataTypes.INTEGER,
    unique: 'cart_item_unique_const',
    allowNull: false,
    references: {
      model: Cart,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
