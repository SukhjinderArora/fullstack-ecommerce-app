const User = require('../models/user');
const Product = require('../models/product');
const Size = require('../models/size');
const Category = require('../models/category');

const getAllProductsByUser = async (req, res) => {
  const { userId } = req.params;
  const productsByUser = await User.findByPk(userId, {
    include: Product,
  });
  return res.status(200).json(productsByUser);
};

const createNewProduct = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user.isAdmin) {
      const error = new Error('User is not authorized to add new products');
      error.status = 401;
      throw error;
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
        const error = new Error('Existing product not found');
        error.status = 404;
        throw error;
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
    next(error);
  }
};

module.exports = { getAllProductsByUser, createNewProduct };
