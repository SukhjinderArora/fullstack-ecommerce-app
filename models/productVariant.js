// A product can have many variants, a variant can have only one product

const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Product = require('./product');

const ProductVariant = sequelize.define('product_variant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: 'unique_product_variant_const',
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
    unique: 'unique_product_variant_const',
  },
});

module.exports = ProductVariant;
