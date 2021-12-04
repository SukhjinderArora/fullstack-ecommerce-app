const http = require('http');
require('dotenv').config();

const app = require('./app');
const sequelize = require('./utils/database');
const logger = require('./utils/logger');

const User = require('./models/user');
const Cart = require('./models/cart');
const Product = require('./models/product');
const Size = require('./models/size');
const ProductSize = require('./models/productSize');
const Category = require('./models/category');
const ProductCategory = require('./models/productCategory');
const ProductCart = require('./models/productCart');

(async function setupDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    User.hasOne(Cart, {
      onDelete: 'CASCADE',
    });
    Cart.belongsTo(User);
    User.hasMany(Product, {
      onDelete: 'CASCADE',
    });
    Product.belongsTo(User);
    Product.belongsToMany(Size, { through: ProductSize });
    Size.belongsToMany(Product, { through: ProductSize });
    Product.belongsToMany(Category, { through: ProductCategory });
    Category.belongsToMany(Product, { through: ProductCategory });
    Product.belongsToMany(Cart, { through: ProductCart });
    Cart.belongsToMany(Product, { through: ProductCart });
    await sequelize.sync({ force: true });
    const user = await User.create({
      username: 'happy007',
      email: 'sukhb1995@gmail.com',
      hashedPassword: 'password',
      isAdmin: true,
    });
    await user.createCart();
  } catch (error) {
    logger.error(error);
  }
})();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port);
