const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

User.prototype.toJSON = function toJSON() {
  const values = { ...this.get() };
  delete values.hashedPassword;
  delete values.createdAt;
  delete values.updatedAt;
  return values;
};

module.exports = User;
