const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Product = require('./product');
const Cart = require('./cart');

const ProductCart = sequelize.define('product_cart', {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'id',
    },
  },
});

module.exports = ProductCart;
