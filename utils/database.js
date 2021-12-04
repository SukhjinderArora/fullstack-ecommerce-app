const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'ecommerce',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432',
  }
);

module.exports = sequelize;
