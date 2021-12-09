const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Product = require('./product');
const Color = require('./color');

const ProductColor = sequelize.define('product_color', {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  colorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Color,
      key: 'id',
    },
  },
});

module.exports = ProductColor;
