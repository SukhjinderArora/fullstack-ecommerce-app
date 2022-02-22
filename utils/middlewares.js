const jwt = require('jsonwebtoken');
const ms = require('ms');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const Token = require('../models/token');
const logger = require('./logger');
const {
  generateJWT,
  generateAccessAndXSRFToken,
  createError,
  COOKIE_OPTIONS,
} = require('./index');

const generateAuthTokens = async (req, res, next) => {
  try {
    if (!req.userId) {
      const error = createError('Internal Server Error', 500);
      throw error;
    }
    const user = await User.findByPk(req.userId);
    if (!user) {
      const error = createError('Invalid credentials', 401);
      throw error;
    }
    const refreshToken = generateJWT(
      req.userId,
      process.env.JWT_SECRET,
      process.env.REFRESH_TOKEN_LIFE
    );
    const {
      token: accessToken,
      xsrfToken,
      expiresAt,
    } = generateAccessAndXSRFToken(req.userId);
    await Token.create({
      refreshToken,
      xsrfToken,
      userId: req.userId,
      expirationTime: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_LIFE)),
    });
    res.cookie('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_LIFE)),
    });
    res.cookie('XSRF-TOKEN', xsrfToken, {
      ...COOKIE_OPTIONS,
      httpOnly: false,
      signed: false,
      expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_LIFE)),
    });
    res.cookie('XSRF-TOKEN-HTTP-ONLY', xsrfToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_LIFE)),
    });
    return res.status(200).json({
      user,
      token: accessToken,
      expiresAt,
    });
  } catch (error) {
    return next(error);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const authorizationToken = req.get('Authorization');
    const jwToken = authorizationToken?.split('Bearer ')[1];
    if (!jwToken) {
      const error = createError('Invalid Credentials', 401);
      throw error;
    }
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    if (!refreshToken) {
      const error = createError('Invalid Credentials', 401);
      throw error;
    }
    const xsrfToken = req.headers['x-xsrf-token'];
    const xsrfTokenFromCookie = signedCookies['XSRF-TOKEN-HTTP-ONLY'];
    const refreshTokenInDB = await Token.findOne({
      where: {
        refreshToken,
      },
    });
    if (
      !xsrfToken ||
      xsrfToken !== xsrfTokenFromCookie ||
      !refreshTokenInDB ||
      refreshTokenInDB.xsrfToken !== xsrfToken
    ) {
      const error = createError('Invalid Credentials', 401);
      throw error;
    }
    console.log('ACCESS TOKEN - ', jwToken);
    console.log(xsrfToken);
    console.log(xsrfTokenFromCookie);
    let decodedToken;
    try {
      decodedToken = jwt.verify(jwToken, process.env.JWT_SECRET + xsrfToken);
    } catch (err) {
      console.log(err);
      const error = createError('Invalid Credentials', 401);
      return next(error);
    }
    const { userId } = decodedToken;
    const user = await User.findByPk(userId);
    if (!user) {
      const error = createError('Invalid Credentials', 401);
      throw error;
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = (req, res, next) => {
  const { user } = req;
  try {
    if (!user.isAdmin) {
      const error = createError(
        'User is not authorized to add new products',
        401
      );
      throw error;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array({ onlyFirstError: true }),
    });
  }
  return next();
};

const errorLogger = (error, req, res, next) => {
  logger.error('\x1b[31m', error);
  next(error);
};

const errorResponder = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.status ? error.message : 'Internal Server Error',
    },
  });
};

module.exports = {
  generateAuthTokens,
  isAuthenticated,
  isAdmin,
  validateRequest,
  errorLogger,
  errorResponder,
};
