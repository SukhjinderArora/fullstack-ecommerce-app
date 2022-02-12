const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};

// Generate JWT Secret key
// node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
