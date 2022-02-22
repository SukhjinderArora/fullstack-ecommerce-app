const { Op, Sequelize } = require('sequelize');

const Product = require('../models/product');
const ProductVariant = require('../models/productVariant');
const ProductSize = require('../models/productSize');
const Category = require('../models/category');
const CartItem = require('../models/cartItem');
const Size = require('../models/size');
const Cart = require('../models/cart');

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

const addProductToCart = async (req, res, next) => {
  const { productSizeId, quantity } = req.body;
  const { user } = req;
  try {
    const productSizeItem = await ProductSize.findByPk(productSizeId);
    if (!productSizeItem) {
      const error = createError('Product not found', 404);
      throw error;
    }
    const cart = await user.getCart();
    const cartItem = await CartItem.findOne({
      where: {
        productsizeId: productSizeItem.id,
        cartId: cart.id,
      },
    });
    let cartQuantity = quantity;
    if (cartItem) {
      cartQuantity = cartItem.quantity + quantity;
    }
    if (cartQuantity > productSizeItem.quantity) {
      const error = createError(
        'Cart quantity exceeds the product stock quantity',
        422
      );
      throw error;
    }
    await cart.addProductsize(productSizeItem, {
      through: {
        quantity: cartQuantity,
      },
    });
    const product = await ProductVariant.findOne({
      include: [
        { model: Product, required: true, attributes: [] },
        {
          model: ProductSize,
          as: 'sizes',
          required: true,
          where: {
            id: productSizeItem.id,
          },
          attributes: ['id', 'size'],
        },
      ],
      attributes: {
        include: [
          [Sequelize.col('product.title'), 'title'],
          [Sequelize.col('product.description'), 'description'],
        ],
      },
    });
    return res.status(201).json({ product: product.get(), cartQuantity });
  } catch (error) {
    return next(error);
  }
};

const getUserCart = async (req, res) => {
  const { user } = req;
  const cart = await user.getCart();
  const productSizes = await ProductSize.findAll({
    include: [
      {
        model: Cart,
        where: {
          id: cart.id,
        },
        through: {
          attributes: ['quantity'],
        },
        attributes: [],
      },
      {
        model: ProductVariant,
        required: true,
        include: {
          model: Product,
        },
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [Sequelize.col('product_variant.product.title'), 'title'],
        [Sequelize.col('product_variant.product.description'), 'description'],
        [Sequelize.col('product_variant.price'), 'price'],
        [Sequelize.col('product_variant.img'), 'img'],
        [Sequelize.col('carts.cart_item.quantity'), 'quantity'],
      ],
      exclude: ['createdAt', 'updatedAt', 'quantity'],
    },
  });
  const totalPrice = productSizes.reduce(
    (acc, cur) => acc + Number(cur.get().price) * Number(cur.get().quantity),
    0
  );
  return res.status(200).json({
    products: productSizes,
    totalPrice,
    deliveryPrice: totalPrice > 0 && totalPrice < 499 ? 40 : 0,
  });
};

const deleteCartItem = async (req, res, next) => {
  const { user } = req;
  const { productSizeId } = req.body;
  try {
    if (!Number(productSizeId)) {
      const error = createError('Invalid product ID', 422);
      throw error;
    }
    const cart = await user.getCart();
    const productSize = await ProductSize.findByPk(productSizeId);
    await cart.removeProductsize(productSize);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return next(error);
  }
};

const modifyCartItem = async (req, res, next) => {
  const { user } = req;
  const { productSizeId, quantity } = req.body;
  try {
    if (!Number(productSizeId)) {
      const error = createError('Invalid product ID', 422);
      throw error;
    }
    if (!Number(quantity) && Number(quantity) !== 0) {
      const error = createError('Invalid Quantity', 422);
      throw error;
    }
    if (Number(quantity) <= 0) {
      return deleteCartItem(req, res, next);
    }
    const cart = await user.getCart();
    const cartItem = await CartItem.findOne({
      where: {
        productsizeId: productSizeId,
        cartId: cart.id,
      },
    });
    if (!cartItem) {
      const error = createError('Product not found in cart', 404);
      throw error;
    }
    await cartItem.update({
      quantity: Number(quantity),
    });
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getAllCategories,
  getAllSizes,
  addProductToCart,
  getUserCart,
  deleteCartItem,
  modifyCartItem,
};
