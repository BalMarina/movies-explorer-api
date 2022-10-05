require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors-handler');

const app = express();

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  autoIndex: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6305e24749b35cc2a3d01d93',
//   };

//   next();
// });

app.use(bodyParser.json());
app.use(router);
app.use(cookieParser());
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
