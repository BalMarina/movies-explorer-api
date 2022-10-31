require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors-handler');

const app = express();

app.use(helmet());

let dbUrl = 'mongodb://localhost:27017/moviesdb';

if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DB_URL;
}

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(bodyParser.json());
app.use(requestLogger);
app.use('/api', router);
app.use(cookieParser());
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
