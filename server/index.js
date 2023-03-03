const express = require('express');
const routes = require('./routes/routes');

require('dotenv').config();
require('./config/database').connect();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
  );
  next();
});

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});
