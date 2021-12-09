// admin routes like add a product, remove a product and dashboard routes

const router = require('express').Router();

const adminController = require('../controllers/admin');

router.get('/products/:userId', adminController.getAllProductsByUser);

module.exports = router;
