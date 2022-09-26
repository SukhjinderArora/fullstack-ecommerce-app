const router = require('express').Router();
const { checkSchema } = require('express-validator');

const authController = require('../controllers/auth');
const { registrationSchema, loginSchema } = require('../utils/validation');
const {
  generateAuthTokens,
  isAuthenticated,
  validateRequest,
} = require('../utils/middlewares');

router.post(
  '/login',
  checkSchema(loginSchema),
  validateRequest,
  authController.login,
  generateAuthTokens
);

router.post(
  '/register',
  checkSchema(registrationSchema),
  validateRequest,
  authController.register,
  generateAuthTokens
);

router.post('/logout', isAuthenticated, authController.logout);

router.post('/verifyToken', authController.verifyAndGenerateToken);

module.exports = router;
