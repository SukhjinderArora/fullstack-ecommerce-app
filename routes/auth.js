const router = require('express').Router();
const { checkSchema } = require('express-validator');

const authController = require('../controllers/auth');
const { registrationSchema, loginSchema } = require('../utils/validation');
const { generateAuthTokens } = require('../utils/middlewares');

router.post(
  '/login',
  checkSchema(loginSchema),
  authController.login,
  generateAuthTokens
);

router.post(
  '/register',
  checkSchema(registrationSchema),
  authController.register,
  generateAuthTokens
);

router.post('/logout', authController.logout);

router.post('/verifyToken', authController.verifyAndGenerateToken);

module.exports = router;
