const User = require('../models/user');
const Product = require('../models/product');

const getAllProductsByUser = async (req, res) => {
  const { userId } = req.params;
  const productsByUser = await User.findByPk(userId, {
    include: Product,
  });
  console.log(productsByUser);
  return res.status(200).json(productsByUser);
};

module.exports = { getAllProductsByUser };
