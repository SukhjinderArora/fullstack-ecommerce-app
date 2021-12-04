const router = require('express').Router();

const cartController = require('../controllers/cart');

router.get('/', cartController.getUserCart);

module.exports = router;
