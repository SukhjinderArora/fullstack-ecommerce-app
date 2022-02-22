const router = require('express').Router();
const { checkSchema } = require('express-validator');

const adminController = require('../controllers/admin');
const {
  isAuthenticated,
  isAdmin,
  validateRequest,
} = require('../utils/middlewares');
const { productSchema } = require('../utils/validation');

router.get('/products/:userId', adminController.getAllProductsByUser);
router.post(
  '/products/add-new',
  isAuthenticated,
  isAdmin,
  checkSchema(productSchema),
  validateRequest,
  adminController.createNewProduct
);

module.exports = router;
