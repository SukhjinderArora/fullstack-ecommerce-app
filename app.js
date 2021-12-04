const app = require('express')();

const User = require('./models/user');

const cartRoutes = require('./routes/cart');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

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
