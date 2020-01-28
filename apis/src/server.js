const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const { APP_PORT = 3000 } = process.env;

app.listen(APP_PORT, () => {
  console.log(`server is running on ${APP_PORT}`);
});
