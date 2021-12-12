const { Op } = require('sequelize');

const Product = require('../models/product');
const ProductVariant = require('../models/productVariant');
const Category = require('../models/category');
const Size = require('../models/size');

const getAllProducts = async (req, res, next) => {
  const { categories, colors, sizes } = req.query;
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          where: {
            category: {
              [Op.or]: categories ? categories.split(',') : [],
            },
          },
        },
        {
          model: ProductVariant,
          where: {
            color: {
              [Op.or]: colors ? colors.split(',') : [],
            },
          },
          include: {
            model: Size,
            where: {
              size: {
                [Op.or]: sizes ? sizes.split(',') : [],
              },
            },
          },
        },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Number(id) !== parseInt(id, 10)) {
      const error = new Error('Invalid product ID');
      error.status = 422;
      throw error;
    }
    const product = await ProductVariant.findByPk(id, {
      include: {
        model: Size,
      },
    });
    if (product) {
      const productVariants = await ProductVariant.findAll({
        where: {
          productId: product.productId,
        },
      });
      const colors = [];
      productVariants.forEach((variant) => {
        colors.push({
          color: variant.color,
          id: variant.id,
        });
      });
      res.status(200).json({ ...product.get(), colors });
    } else {
      const error = new Error('Product not found.');
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const addProductToCart = async (req, res) => {};

const modifyCart = (req, res) => {};

module.exports = {
  getAllProducts,
  getProductById,
  addProductToCart,
  modifyCart,
};
