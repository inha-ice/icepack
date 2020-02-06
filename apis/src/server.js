const dotenv = require('dotenv');
const app = require('./app');
const { sequelize } = require('./database/models');

dotenv.config();

const { APP_PORT = 3000 } = process.env;

sequelize.sync();

app.listen(APP_PORT, () => {
  console.log(`server is running on ${APP_PORT}`);
});
