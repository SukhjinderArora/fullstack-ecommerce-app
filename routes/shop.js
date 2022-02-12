const router = require('express').Router();
const { body } = require('express-validator');

const shopController = require('../controllers/shop');
const { isAuthenticated } = require('../utils/middlewares');

router.get('/products', shopController.getAllProducts);
router.get('/product/:id', shopController.getProductById);
router.get('/categories', shopController.getAllCategories);
router.get('/sizes', shopController.getAllSizes);
router.post(
  '/cart/add',
  isAuthenticated,
  body('productSizeId')
    .notEmpty()
    .withMessage('ID cannot be null')
    .isNumeric()
    .withMessage('ID can only be numeric'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be null')
    .isNumeric()
    .withMessage('Quantity must be a number'),
  shopController.addProductToCart
);

module.exports = router;
