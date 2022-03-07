const router = require('express').Router();
const { checkSchema } = require('express-validator');

const shopController = require('../controllers/shop');
const { isAuthenticated, validateRequest } = require('../utils/middlewares');
const { cartItemSchema } = require('../utils/validation');

router.get('/products', shopController.getAllProducts);
router.get('/product/:id', shopController.getProductById);
router.get('/categories', shopController.getAllCategories);
router.get('/sizes', shopController.getAllSizes);
router.post(
  '/cart',
  isAuthenticated,
  checkSchema(cartItemSchema),
  validateRequest,
  shopController.addProductToCart
);
router.get('/cart', isAuthenticated, shopController.getUserCart);
router.delete('/cart', isAuthenticated, shopController.deleteCartItem);
router.patch('/cart', isAuthenticated, shopController.modifyCartItem);
router.get('/address', isAuthenticated, shopController.getUserAddresses);
router.post('/order', isAuthenticated, shopController.createNewOrder);
router.get('/order/:id', isAuthenticated, shopController.getOrderById);
router.get('/orders', isAuthenticated, shopController.getAllOrdersByAUser);

module.exports = router;
