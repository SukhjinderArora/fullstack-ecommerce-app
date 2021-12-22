const { validationResult } = require('express-validator');

const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductSize = require('../models/productSize');

const getAllProductsByUser = async (req, res) => {
  const { userId } = req.params;
  const productsByUser = await User.findByPk(userId, {
    include: Product,
  });
  return res.status(200).json(productsByUser);
};

const createNewProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { user } = req;
    const { title, description, color, img, price, sizes, categories } =
      req.body;

    const { productId } = req.query;
    let product;
    if (productId) {
      product = await Product.findByPk(productId);
      if (!product) {
        const error = new Error('Existing product not found');
        error.status = 404;
        throw error;
      }
    } else {
      product = await user.createProduct({
        title,
        description,
      });
    }
    const productVariant = await product.createProduct_variant({
      color,
      img,
      price,
    });
    const productSizes = await Promise.all(
      sizes.map(async (size) =>
        ProductSize.create({
          size: size.size,
          quantity: size.quantity,
          productVariantId: productVariant.id,
        })
      )
    );
    await productVariant.setSizes(productSizes);
    const productCategories = await Category.findAll({
      where: {
        category: categories,
      },
    });
    await product.setCategories(productCategories);
    return res.status(201).json({ message: 'Product created' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllProductsByUser, createNewProduct };
