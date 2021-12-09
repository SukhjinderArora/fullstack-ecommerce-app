const { Op } = require('sequelize');

const Product = require('../models/product');
const Category = require('../models/category');
const Color = require('../models/color');
const Size = require('../models/size');

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
          model: Color,
          where: {
            color: {
              [Op.or]: colors ? colors.split(',') : [],
            },
          },
        },
        {
          model: Size,
          where: {
            size: {
              [Op.or]: sizes ? sizes.split(',') : [],
            },
          },
        },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Color,
      },
      {
        model: Size,
      },
    ],
  });
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).json({ message: 'Product not found.' });
};

module.exports = {
  getAllProducts,
  getProductById,
};
