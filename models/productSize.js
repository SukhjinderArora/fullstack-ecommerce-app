const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Product = require('./product');
const Size = require('./size');

const ProductSize = sequelize.define('product_size', {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  sizeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Size,
      key: 'id',
    },
  },
});

module.exports = ProductSize;
