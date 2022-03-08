const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Token = require('../models/token');
const {
  generateAccessAndXSRFToken,
  createError,
  clearTokens,
} = require('../utils');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const error = createError('Invalid email or password', 401);
      throw error;
    }
    const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatched) {
      const error = createError('Invalid email or password', 401);
      throw error;
    }
    req.userId = user.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  const saltRounds = 12;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      hashedPassword,
      isAdmin: false,
    });
    await user.createCart();
    req.userId = user.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

const verifyAndGenerateToken = async (req, res, next) => {
  const { signedCookies } = req;
  const { refreshToken } = req.signedCookies;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  try {
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
      xsrfToken !== refreshTokenInDB.xsrfToken
    ) {
      await clearTokens(req, res);
      const error = createError('Invalid credentials', 401);
      throw error;
    }
    try {
      const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const { userId } = decodedToken;
      const user = await User.findByPk(userId);
      if (!user) {
        await clearTokens(req, res);
        const error = createError('Invalid credentials', 401);
        throw error;
      }
      const { token: accessToken, expiresAt } = generateAccessAndXSRFToken(
        user.id
      );
      return res.status(200).json({
        user,
        token: accessToken,
        expiresAt,
      });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res) => {
  await clearTokens(req, res);
  return res.sendStatus(204);
};

module.exports = {
  login,
  register,
  verifyAndGenerateToken,
  logout,
};
