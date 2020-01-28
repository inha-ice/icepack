const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

const {
  NODE_ENV,
  MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD,
} = process.env;

const SEQUELIZE_COMMON_OPTIONS = {};

if (NODE_ENV !== 'development') {
  SEQUELIZE_COMMON_OPTIONS.logging = false;
}

const SEQUELIZE_MYSQL_OPTIONS = {
  database: MYSQL_DATABASE,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
};

const sequelize = (NODE_ENV === 'test')
  ? new Sequelize('sqlite::memory:', SEQUELIZE_COMMON_OPTIONS)
  : new Sequelize(Object.assign(SEQUELIZE_COMMON_OPTIONS, SEQUELIZE_MYSQL_OPTIONS));

module.exports = {
  Sequelize,
  sequelize,
};
