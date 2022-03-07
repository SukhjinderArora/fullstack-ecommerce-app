const { Op, Sequelize } = require('sequelize');

const Product = require('../models/product');
const ProductVariant = require('../models/productVariant');
const ProductSize = require('../models/productSize');
const Category = require('../models/category');
const CartItem = require('../models/cartItem');
const Size = require('../models/size');
const Cart = require('../models/cart');
const Address = require('../models/address');
const ShippingAddress = require('../models/shippingAddress');

const { createError } = require('../utils');
const sequelize = require('../utils/database');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

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

const getCartItems = async (cartId) => {
  const productSizes = await ProductSize.findAll({
    include: [
      {
        model: Cart,
        where: {
          id: cartId,
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
  return productSizes;
};

const getUserCart = async (req, res) => {
  const { user } = req;
  const cart = await user.getCart();
  const cartItems = await getCartItems(cart.id);
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + Number(cur.get().price) * Number(cur.get().quantity),
    0
  );
  return res.status(200).json({
    products: cartItems,
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

const getUserAddresses = async (req, res, next) => {
  const { user } = req;
  try {
    const addresses = await user.getAddresses();
    return res.status(200).json({ addresses });
  } catch (error) {
    return next(error);
  }
};

const createNewOrder = async (req, res, next) => {
  const { user } = req;
  const { addressId } = req.body;
  const t = await sequelize.transaction();
  try {
    if (!Number(addressId)) {
      const error = createError('Invalid address ID', 422);
      throw error;
    }
    const userAddress = await Address.findOne({
      where: {
        id: addressId,
        userId: user.id,
      },
    });
    if (!userAddress) {
      const error = createError('Invalid address', 422);
      throw error;
    }
    const cart = await user.getCart();
    const cartItems = await getCartItems(cart.id);
    if (cartItems.length === 0) {
      const error = createError(`User's cart is empty`, 404);
      throw error;
    }
    const { name, phoneNumber, pincode, address, locality, city, state } =
      userAddress;
    const shippingAddress = await ShippingAddress.create(
      {
        name,
        phoneNumber,
        pincode,
        address,
        locality,
        city,
        state,
      },
      { transaction: t }
    );
    const order = await user.createOrder(
      {
        shippingaddressId: shippingAddress.id,
      },
      { transaction: t }
    );
    const orderItems = [];
    await Promise.all(
      cartItems.map(async (item) => {
        const { title, size, price, img, quantity, productVariantId } =
          item.get();
        try {
          const orderItem = await order.createOrder_item(
            {
              productTitle: title,
              productSize: size,
              productPrice: price,
              productImg: img,
              quantity,
              productVariantId,
            },
            { transaction: t }
          );
          return orderItems.push(orderItem);
        } catch (error) {
          return next(error);
        }
      })
    );
    await CartItem.destroy(
      {
        where: {
          cartId: cart.id,
        },
      },
      { transaction: t }
    );
    await t.commit();
    return res.status(200).json({
      message: 'Order successfully placed',
      orderId: order.id,
    });
  } catch (error) {
    await t.rollback();
    return next(error);
  }
};

const getAllOrdersByAUser = async (req, res, next) => {
  const { user } = req;
  try {
    const orders = await Order.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: ShippingAddress,
          required: true,
        },
        {
          model: OrderItem,
          required: true,
          as: 'items',
        },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id,
        userId: user.id,
      },
      include: [
        {
          model: ShippingAddress,
          required: true,
        },
        {
          model: OrderItem,
          required: true,
          as: 'items',
        },
      ],
    });
    if (!order) {
      const error = createError('Order does not exist', 404);
      throw error;
    }
    return res.status(200).json(order);
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
  getUserAddresses,
  createNewOrder,
  getAllOrdersByAUser,
  getOrderById,
};
