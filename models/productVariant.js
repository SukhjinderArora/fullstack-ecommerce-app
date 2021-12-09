// A product can have many variants, a variant can have only one product

const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Product = require('./product');

const ProductVariant = sequelize.define(
  'product_variant',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id', 'productId', 'color'],
      },
    ],
  }
);

module.exports = ProductVariant;
