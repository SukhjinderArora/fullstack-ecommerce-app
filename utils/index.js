const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const ms = require('ms');

const dev = process.env.NODE_ENV === 'development';

const generateJWT = (userId, secret, expirationTime) =>
  jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: expirationTime }
  );

const generateXSRFToken = () => nanoid(48);

const generateAccessAndXSRFToken = (userId) => {
  const xsrfToken = generateXSRFToken();
  const privateKey = process.env.JWT_SECRET + xsrfToken;
  const accessToken = generateJWT(
    userId,
    privateKey,
    process.env.ACCESS_TOKEN_LIFE
  );
  const expiresAt = new Date(Date.now() + ms(process.env.ACCESS_TOKEN_LIFE));
  return {
    token: accessToken,
    xsrfToken,
    expiresAt,
  };
};

const COOKIE_OPTIONS = {
  // domain: "localhost",
  httpOnly: true,
  secure: !dev,
  signed: true,
};

const createError = (message = 'Internal Server Error', statusCode = 500) => {
  const error = new Error(message);
  error.status = statusCode;
  return error;
};

module.exports = {
  generateJWT,
  generateXSRFToken,
  generateAccessAndXSRFToken,
  COOKIE_OPTIONS,
  createError,
};
