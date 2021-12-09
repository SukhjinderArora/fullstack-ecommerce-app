const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const ProductVariant = require('./productVariant');
const Size = require('./size');

const ProductSize = sequelize.define('product_size', {
  productVariantId: {
    type: DataTypes.INTEGER,
    references: {
      model: ProductVariant,
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
  productQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductSize;
