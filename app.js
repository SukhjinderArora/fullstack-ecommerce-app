const express = require('express');
const cors = require('cors');

const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const { errorLogger, errorResponder } = require('./utils/middlewares');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ type: 'application/json' }));
app.use('/api/shop', shopRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(errorLogger);
app.use(errorResponder);

module.exports = app;
