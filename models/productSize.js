const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const ProductVariant = require('./productVariant');

const ProductSize = sequelize.define('productsize', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  size: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: 'productsize_unique_const',
    set(value) {
      this.setDataValue('size', value.toLowerCase());
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productVariantId: {
    type: DataTypes.INTEGER,
    unique: 'productsize_unique_const',
    allowNull: false,
    references: {
      model: ProductVariant,
      key: 'id',
    },
  },
});

module.exports = ProductSize;
