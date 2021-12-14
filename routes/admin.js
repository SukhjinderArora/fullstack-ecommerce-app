const router = require('express').Router();

const adminController = require('../controllers/admin');
const { verifyToken } = require('../utils/middlewares');

router.get('/products/:userId', adminController.getAllProductsByUser);
router.post('/products/add-new', verifyToken, adminController.createNewProduct);

module.exports = router;
