const router = require('express').Router();

const shopController = require('../controllers/shop');
const { verifyToken } = require('../utils/middlewares');

router.get('/products', shopController.getAllProducts);
router.get('/product/:id', shopController.getProductById);
router.post('/cart/add', verifyToken, shopController.addProductToCart);
router.post('/cart/modify', shopController.modifyCart);

module.exports = router;
