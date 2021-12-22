const router = require('express').Router();
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const { verifyToken, isAdmin } = require('../utils/middlewares');

router.get('/products/:userId', adminController.getAllProductsByUser);
router.post(
  '/products/add-new',
  verifyToken,
  isAdmin,
  body('title')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Title can only contain letters, no number')
    .isLength({ min: 20 })
    .withMessage('Title cannot be less than 20 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isLength({ min: 20 })
    .withMessage('Description cannot be less than 20 characters'),
  body('color').notEmpty().withMessage('Color cannot be empty'),
  body('img')
    .notEmpty()
    .withMessage('img cannot be empty')
    .isURL()
    .withMessage('img must be a valid url'),
  body('price').isNumeric().withMessage('price must be numeric'),
  body('sizes')
    .isArray()
    .withMessage(
      'sizes should be an array of objects containing size and quantity'
    ),
  body('categories')
    .isArray()
    .withMessage(
      'categories should be an array containing categories the product belongs to'
    ),
  adminController.createNewProduct
);

module.exports = router;
