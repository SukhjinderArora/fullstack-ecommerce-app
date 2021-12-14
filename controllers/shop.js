const { Op, Sequelize } = require('sequelize');

const Product = require('../models/product');
const ProductVariant = require('../models/productVariant');
const ProductSize = require('../models/productSize');
const Category = require('../models/category');

const getAllProducts = async (req, res, next) => {
  const { categories, colors, sizes } = req.query;
  try {
    const products = await ProductVariant.findAll({
      where: {
        color: {
          [Op.or]: colors ? colors.split(',') : [],
        },
      },
      include: [
        {
          model: Product,
          required: true,
          include: {
            model: Category,
            required: true,
            attributes: [],
            where: {
              category: {
                [Op.or]: categories ? categories.split(',') : [],
              },
            },
          },
          attributes: [],
        },
        {
          model: ProductSize,
          as: 'sizes',
          required: true,
          where: {
            size: {
              [Op.or]: sizes ? sizes.split(',') : [],
            },
          },
          attributes: ['size', 'quantity'],
        },
      ],
      attributes: {
        include: [
          [Sequelize.col('product.id'), 'productId'],
          [Sequelize.col('product.title'), 'title'],
          [Sequelize.col('product.description'), 'description'],
        ],
        exclude: ['createdAt', 'updatedAt'],
      },
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
      include: [
        { model: Product, required: true, attributes: [] },
        {
          model: ProductSize,
          as: 'sizes',
          required: true,
          attributes: ['id', 'size', 'quantity'],
        },
      ],
      attributes: {
        include: [
          [Sequelize.col('product.id'), 'productId'],
          [Sequelize.col('product.title'), 'title'],
          [Sequelize.col('product.description'), 'description'],
        ],
        exclude: ['createdAt', 'updatedAt'],
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
