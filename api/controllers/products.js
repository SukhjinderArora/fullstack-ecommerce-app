const { Op, Sequelize } = require('sequelize');

const Product = require('../models/product');
const ProductVariant = require('../models/productVariant');
const ProductSize = require('../models/productSize');
const Category = require('../models/category');

const { createError } = require('../utils');

const getAllProducts = async (req, res, next) => {
  const {
    categories,
    colors,
    sizes,
    limit,
    offset,
    priceRange,
    sortBy,
    orderBy,
  } = req.query;

  let order = [];
  if (sortBy === 'price') {
    order = [['price', orderBy === 'asc' ? 'ASC' : 'DESC'], ['id']];
  } else if (sortBy === 'date') {
    order = [['createdAt', 'DESC'], ['id']];
  }

  try {
    const { count, rows: products } = await ProductVariant.findAndCountAll({
      where: {
        color: {
          [Op.or]: colors ? colors.split(',') : [],
        },
        price: {
          [Op.between]: priceRange || [0, 100000],
        },
      },
      order,
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      distinct: true,
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
      },
    });
    res.status(200).json({ products, totalProducts: count });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Number(id) !== parseInt(id, 10)) {
      const error = createError('Invalid product ID', 422);
      throw error;
    }
    const product = await ProductVariant.findByPk(id, {
      include: [
        {
          model: Product,
          required: true,
          include: {
            model: Category,
            attributes: [],
          },
        },
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
          [Sequelize.col('product.categories.category'), 'category'],
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
      const error = createError('Product not found', 404);
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
