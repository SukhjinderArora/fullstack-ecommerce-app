// Shop related routes like add to cart, order, remove from cart etcs

const router = require('express').Router();

const shopController = require('../controllers/shop');

// router.get('/products?categories=1', shopController.getProductsByCategories);
router.get('/products', shopController.getAllProducts);
router.get('/product/:id', shopController.getProductById);

module.exports = router;
