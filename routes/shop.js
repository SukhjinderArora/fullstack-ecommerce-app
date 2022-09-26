const router = require('express').Router();
const { checkSchema } = require('express-validator');

const { isAuthenticated, validateRequest } = require('../utils/middlewares');
const { cartItemSchema, addressSchema } = require('../utils/validation');

const cartController = require('../controllers/cart');
const ordersController = require('../controllers/order');
const productsController = require('../controllers/products');
const filtersController = require('../controllers/filters');
const addressController = require('../controllers/address');

router.get('/products', productsController.getAllProducts);
router.get('/product/:id', productsController.getProductById);

router.get('/categories', filtersController.getAllCategories);
router.get('/sizes', filtersController.getAllSizes);

router.post(
  '/cart',
  isAuthenticated,
  checkSchema(cartItemSchema),
  validateRequest,
  cartController.addProductToCart
);
router.get('/cart', isAuthenticated, cartController.getUserCart);
router.delete('/cart', isAuthenticated, cartController.deleteCartItem);
router.patch('/cart', isAuthenticated, cartController.modifyCartItem);

router.get('/address', isAuthenticated, addressController.getUserAddresses);
router.post(
  '/address',
  isAuthenticated,
  checkSchema(addressSchema),
  validateRequest,
  addressController.addNewAddress
);

router.post('/order', isAuthenticated, ordersController.createNewOrder);
router.get('/order/:id', isAuthenticated, ordersController.getOrderById);
router.get('/orders', isAuthenticated, ordersController.getAllOrdersByAUser);
router.post(
  '/order/razorpay',
  isAuthenticated,
  ordersController.createRazorPayOrder
);
router.post(
  '/order/verify-payment',
  isAuthenticated,
  ordersController.verifyPayment
);

module.exports = router;
