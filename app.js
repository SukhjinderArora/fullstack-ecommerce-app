const express = require('express');
const cors = require('cors');

const User = require('./models/user');

const cartRoutes = require('./routes/cart');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ type: 'application/json' }));
app.use(async (req, res, next) => {
  const user = await User.findByPk(1);
  req.user = user;
  next();
});

app.use('/api/cart', cartRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use((req, res) => res.status(404).json({ message: 'not found!' }));

module.exports = app;
