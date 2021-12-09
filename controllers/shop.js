const { Op } = require('sequelize');

const Product = require('../models/product');
const ProductVariant = require('../models/productVariant');
const Category = require('../models/category');
const Size = require('../models/size');

const logger = require('../utils/logger');

const getAllProducts = async (req, res) => {
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
    logger.error(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
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
    return res.status(200).json({ ...product.get(), colors });
  }
  return res.status(404).json({ message: 'Product not found.' });
};

module.exports = {
  getAllProducts,
  getProductById,
};
