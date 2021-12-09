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
const Color = require('./models/color');
const ProductColor = require('./models/productColor');
const ProductVariant = require('./models/productVariant');

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
    Color.belongsToMany(Product, { through: ProductColor });
    Product.belongsToMany(Color, { through: ProductColor });
    // Product.hasMany(ProductVariant);
    // ProductVariant.belongsTo(Product);
    await sequelize.sync();
    // const product = await Product.create({
    //   title: 'shirt',
    //   description: `Men's shirt`,
    //   img: 'https://images.pexels.com/photos/10369247/pexels-photo-10369247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //   price: 45.99,
    //   quantity: 5,
    // });
    // const category = await Category.create({
    //   category: 'men',
    // });
    // const category2 = await Category.create({
    //   category: 'women',
    // });
    const user = await User.create({
      firstName: 'Happy',
      lastName: 'Arora',
      username: 'happy007',
      email: 'sukhb1995@gmail.com',
      hashedPassword: 'password',
      isAdmin: true,
    });
    // await user.addProduct(product);
    // const product = await user.createProduct({
    //   title: 'shirt',
    //   description: `Men's shirt`,
    //   img: 'https://images.pexels.com/photos/10369247/pexels-photo-10369247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //   price: 45.99,
    //   quantity: 5,
    // });
    // const product2 = await user.createProduct({
    //   title: 'T-shirt',
    //   description: `Men's T-shirt`,
    //   img: 'https://images.pexels.com/photos/10369247/pexels-photo-10369247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //   price: 50.99,
    //   quantity: 25,
    // });
    // const product3 = await Product.create({
    //   title: 'Pants',
    //   description: `Men's Pants`,
    //   img: 'https://images.pexels.com/photos/10369247/pexels-photo-10369247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //   price: 50.99,
    //   quantity: 25,
    //   userId: 1,
    // });
    // await category.addProduct(product);
    // await category2.addProduct(product2);
    await user.createCart();
  } catch (error) {
    logger.error(error);
  }
})();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port);
