'use strict';

const express = require('express');

const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const val = require('../validations/products');
const { checkAdmin } = require('../modules/middleware');

router.get('/api/products', (_req, res, next) => {
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

router.get('/api/admin/products', checkAdmin, (_req, res, next) => {
  knex('products')
    .then((products) => {
      res.send(camelizeKeys(products))
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/api/products/:id', (req, res, next) => {
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

router.post('/api/admin/products', checkAdmin, ev(val.post), (req, res, next) => {
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
        .update(decamelizeKeys(updatedProduct), '*')
    })
    .then((products) => {
      res.send(camelizeKeys(products[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
