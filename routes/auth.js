const router = require('express').Router();
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

router.post(
  '/login',
  body('username').notEmpty().withMessage('username cannot be empty').trim(),
  body('password').notEmpty().withMessage('password cannot be empty').trim(),
  authController.login
);

router.post(
  '/register',
  body('firstName')
    .notEmpty()
    .withMessage('firstName cannot be empty')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Length must be in the range 1-20')
    .escape(),
  body('lastName')
    .notEmpty()
    .withMessage('lastName cannot be empty')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Length must be in the range 1-20')
    .escape(),
  body('username')
    .notEmpty()
    .withMessage('username cannot be empty')
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Length must be in the range 3-10')
    .not()
    .isNumeric()
    .withMessage('username cannot be all numbers')
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({
        where: {
          username: value,
        },
      });
      if (user) {
        return Promise.reject(new Error('Username already in use'));
      }
      return true;
    }),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Email is invalid.')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({
        where: {
          email: value,
        },
      });
      if (user) {
        return Promise.reject(new Error('E-mail already in use'));
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .trim()
    .isAlphanumeric()
    .withMessage('Password should be alphanumeric')
    .isLength({ min: 8, max: 16 })
    .withMessage('Length must be 8-16'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  authController.register
);

module.exports = router;
