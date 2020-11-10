import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
};
