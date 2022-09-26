const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Product = require('./product');
const Category = require('./category');

const ProductCategory = sequelize.define('product_category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    unique: 'product_category_unique_const',
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    unique: 'product_category_unique_const',
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

module.exports = ProductCategory;
