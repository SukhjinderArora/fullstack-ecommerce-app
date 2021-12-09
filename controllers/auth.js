const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'invalid username or password' });
    }
    const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
    if (passwordMatched) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
      return res.status(201).json({
        user,
        token,
      });
    }
    return res.status(401).json({ message: 'invalid username or password' });
  } catch (error) {
    return res.status(500).json({ message: 'server error' });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, username, email, password } = req.body;

  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    hashedPassword,
    isAdmin: true,
  });

  await user.createCart();

  try {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'server error' });
  }
};

module.exports = {
  login,
  register,
};
