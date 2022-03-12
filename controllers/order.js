const Razorpay = require('razorpay');
const { nanoid } = require('nanoid');
const crypto = require('crypto');

const CartItem = require('../models/cartItem');
const Address = require('../models/address');
const ShippingAddress = require('../models/shippingAddress');

const { createError } = require('../utils');
const sequelize = require('../utils/database');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const { getCartItems } = require('./cart');

const createNewOrder = async (req, res, next) => {
  const { user } = req;
  const { addressId, razorpayOrderId } = req.body;
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
        razorpayOrderId: razorpayOrderId || null,
      },
      { transaction: t }
    );
    const orderItems = [];
    try {
      await Promise.all(
        cartItems.map(async (item) => {
          const { title, size, price, img, quantity, productVariantId } =
            item.get();
          const orderItem = await order.createItem(
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
          orderItems.push(orderItem);
        })
      );
    } catch (error) {
      await t.rollback();
      return next(error);
    }
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

const createRazorPayOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const cart = await user.getCart();
    const cartItems = await getCartItems(cart.id);
    let totalPrice = cartItems.reduce(
      (acc, cur) => acc + Number(cur.get().price) * Number(cur.get().quantity),
      0
    );
    totalPrice = totalPrice < 499 ? totalPrice + 40 : totalPrice;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: totalPrice * 100,
      currency: 'INR',
      receipt: `receipt_${nanoid()}`,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      const error = createError('Something went wrong!', 500);
      throw error;
    }
    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
};

const verifyPayment = (req, res, next) => {
  try {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    shasum.update(`${orderId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');
    if (digest !== razorpaySignature) {
      const error = createError('Transaction not legit', 400);
      throw error;
    }
    return res.status(200).json({
      msg: 'success',
      orderId: razorpayOrderId,
      paymentid: razorpayPaymentId,
    });
  } catch (error) {
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
  createNewOrder,
  createRazorPayOrder,
  verifyPayment,
  getAllOrdersByAUser,
  getOrderById,
};
