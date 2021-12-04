const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Product = require('./product');
const Category = require('./category');

const ProductCategory = sequelize.define('product_category', {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

module.exports = ProductCategory;
