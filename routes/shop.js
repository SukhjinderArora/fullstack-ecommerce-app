// Shop related routes like add to cart, order, remove from cart etcs

const router = require('express').Router();

const shopController = require('../controllers/shop');
const { verifyToken } = require('../utils/middlewares');

// router.get('/products?categories=1', shopController.getProductsByCategories);
router.get('/products', shopController.getAllProducts);
router.get('/product/:id', shopController.getProductById);
router.post('/cart/add', verifyToken, shopController.addProductToCart);
router.post('/cart/modify', shopController.modifyCart);

module.exports = router;
