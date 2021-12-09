const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Product = require('../models/product');
const Size = require('../models/size');
const logger = require('../utils/logger');
const Category = require('../models/category');

const getAllProductsByUser = async (req, res) => {
  const { userId } = req.params;
  const productsByUser = await User.findByPk(userId, {
    include: Product,
  });
  return res.status(200).json(productsByUser);
};

const createNewProduct = async (req, res) => {
  const authorizationToken = req.get('Authorization');
  const jwToken = authorizationToken.split('Bearer ')[1];
  try {
    const decodedToken = jwt.verify(jwToken, process.env.JWT_SECRET);
    const { userId } = decodedToken;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isAdmin) {
      res
        .status(401)
        .json({ message: 'User is not authorized to add new products' });
    }
    const {
      title,
      description,
      color,
      img,
      price,
      quantity,
      sizes,
      categories,
    } = req.body;

    const { productId } = req.query;
    let product;
    if (productId) {
      product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Existing product not found');
      }
    } else {
      product = await user.createProduct();
    }
    const productVariant = await product.createProduct_variant({
      title,
      description,
      color,
      img,
      price,
      quantity,
    });
    const productSizes = await Size.findAll({
      where: {
        size: sizes,
      },
    });
    await productVariant.setSizes(productSizes, {
      through: {
        productQty: quantity,
      },
    });
    const productCategories = await Category.findAll({
      where: {
        category: categories,
      },
    });
    await product.setCategories(productCategories);
    res.status(201).json({ message: 'Product created' });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

module.exports = { getAllProductsByUser, createNewProduct };
