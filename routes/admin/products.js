'use strict';

const express = require('express');

const router = express.Router();
const knex = require('../../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const val = require('../../validations/products');
const { checkAdmin } = require('../../modules/middleware');

router.get('/products', checkAdmin, (_req, res, next) => {
  knex('products')
    .then((products) => {
      res.send(camelizeKeys(products))
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/products', checkAdmin, ev(val.post), (req, res, next) => {
  const productInfo = req.body;

  knex('products')
  .insert(decamelizeKeys(productInfo), '*')
  .then((products) => {
    res.send(camelizeKeys(products[0]));
  })
  .catch((err) => {
    next(err)
  });
});

router.patch('/api/admin/products/:id', checkAdmin, ev(val.patch),
  (req, res,next) => {
  const updatedProduct = req.body;
  const id = req.params.id;
  if (isNaN(id)) {
    next(err)
  }

  knex('products')
    .where('id', id)
    .first()
    .then((exists) => {
      if (!exists) {
        throw boom.notFound('Invalid Product');
      }

      return knex('products')
        .where('id', id)
        .update(decamelizeKeys(updatedProduct), '*');
    })
    .then((products) => {
      res.send(camelizeKeys(products[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
