const http = require('http');
require('dotenv').config();

const app = require('./app');
const sequelize = require('./utils/database');
const logger = require('./utils/logger');

const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Product = require('./models/product');
const ProductVariant = require('./models/productVariant');
const ProductSize = require('./models/productSize');
const Category = require('./models/category');
const ProductCategory = require('./models/productCategory');
const Address = require('./models/address');
const ShippingAddress = require('./models/shippingAddress');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');
const Token = require('./models/token');

(async function setupDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    User.hasOne(Cart, {
      onDelete: 'CASCADE',
    });
    Cart.belongsTo(User);
    User.hasMany(Address);
    Address.belongsTo(User);
    User.hasMany(Order, {
      onDelete: 'CASCADE',
    });
    Order.belongsTo(User);
    ShippingAddress.hasMany(Order, {
      onDelete: 'RESTRICT',
    });
    Order.belongsTo(ShippingAddress);
    Order.hasMany(OrderItem, {
      as: 'items',
    });
    OrderItem.belongsTo(Order);
    User.hasMany(Product, {
      onDelete: 'CASCADE',
    });
    Product.belongsTo(User);
    User.hasMany(Token);
    Token.belongsTo(User);
    Product.belongsToMany(Category, { through: ProductCategory });
    Category.belongsToMany(Product, { through: ProductCategory });
    Product.hasMany(ProductVariant, {
      onDelete: 'CASCADE',
    });
    ProductVariant.belongsTo(Product);
    ProductVariant.hasMany(ProductSize, {
      as: 'sizes',
      // foreignKey: 'productVariantId',
      onDelete: 'CASCADE',
    });
    ProductSize.belongsTo(ProductVariant);
    ProductSize.belongsToMany(Cart, { through: CartItem });
    Cart.belongsToMany(ProductSize, { through: CartItem });
    await sequelize.sync();
  } catch (error) {
    logger.error(error);
  }
})();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port);
