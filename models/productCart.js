const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const ProductVariant = require('./productVariant');
const Cart = require('./cart');

const ProductCart = sequelize.define('product_cart', {
  productVariantId: {
    type: DataTypes.INTEGER,
    references: {
      model: ProductVariant,
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
  productQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productSize: {
    type: DataTypes.STRING(10),
    allowNull: false,
    set(value) {
      this.setDataValue('productSize', value.toLowerCase());
    },
  },
});

module.exports = ProductCart;
