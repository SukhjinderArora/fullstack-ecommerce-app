const Category = require('../models/category');
const Size = require('../models/size');

const getAllCategories = async (req, res, next) => {
  try {
    const result = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const getAllSizes = async (req, res, next) => {
  try {
    const result = await Size.findAll({
      order: ['id'],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCategories,
  getAllSizes,
};
