const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   'ecommerce',
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'postgres',
//     port: '5432',
//   }
// );

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
