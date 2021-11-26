const express = require('express');
const path = require('path');
const logger = require('morgan');

const db = require('./config/connection');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
