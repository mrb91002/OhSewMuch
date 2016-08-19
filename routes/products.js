'use strict';

const express = require('express');

const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const val = require('../validations/products');

router.get('/products', (_req, res, next) => {
  knex('products')
    .where('deleted', null)
    .then((products) => {
      let prods = camelizeKeys(products);

      prods = prods.map((element) => {
        delete element.createdAt;
        delete element.updatedAt;
        delete element.deleted;

        return element;
      });

      res.send(prods);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/products/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id)

  if (Number.isNaN(id)) {
    return next();
  }

  knex('products')
    .where('id', id)
    .first()
    .then((product) => {
      res.send(camelizeKeys(product));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
