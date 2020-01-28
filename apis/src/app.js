const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const errors = require('./middlewares/errors');
const { sequelize } = require('./database/models');
const routes = require('./routes');

const { NODE_ENV } = process.env;

sequelize.sync();

const app = express();

app.set('trust proxy', true);

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(routes);
app.use(errors);

module.exports = app;
