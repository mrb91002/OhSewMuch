'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;


// Middleware
const ev = require('express-validation');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Routes
// const posts = require('./routes/posts');
// const topics = require('./routes/topics');
const customers = require('./routes/customers');
const products = require('./routes/products');
const token = require('./routes/token');

const app = express();

app.disable('x-powered-by');

// Use Routes
switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(posts);
// app.use(topics);
app.use(customers);
app.use(products);
app.use(token);

// Page not found handler
app.use((_req, res, _next) => {
  res.sendStatus(404);
});

// Global error handler
// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'application/json')
      .send(err);
  }

  if (err.output && err.output.statusCode) {
    let responseType;

    if (err.json) {
      responseType = 'application/json';
    }
    else {
      responseType = 'text/plain';
    }

    return res
      .status(err.output.statusCode)
      .set('Content-Type', responseType)
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
