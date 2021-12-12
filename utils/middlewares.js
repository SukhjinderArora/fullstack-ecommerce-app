const jwt = require('jsonwebtoken');

const User = require('../models/user');
const logger = require('./logger');

const verifyToken = async (req, res, next) => {
  try {
    const authorizationToken = req.get('Authorization');
    const jwToken = authorizationToken.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(jwToken, process.env.JWT_SECRET);
    } catch (error) {
      error.status = 401;
      next(error);
    }
    const { userId } = decodedToken;
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
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
      message: error.message || 'Internal Server Error',
    },
  });
};

module.exports = {
  verifyToken,
  errorLogger,
  errorResponder,
};
