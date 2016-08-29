'use strict';

const { camelizeKeys } = require('humps');
const express = require('express');
const knex = require('../knex');
const router = express.Router();// eslint-disable-line new-cap

router.get('/products', (_req, res, next) => {
  let resultProducts;

  knex('products')
    .where('deleted', null)
    .orderBy('name')
    .then((products) => {
      resultProducts = camelizeKeys(products);

      return Promise.all(resultProducts.map((prod) => {
        delete prod.createdAt;
        delete prod.updatedAt;
        delete prod.deleted;

        return knex('product_images')
          .select('alt_text', 'display_order', 'image_url')
          .where('product_id', prod.id)
          .orderBy('display_order')
          .then((imgs) => {
            prod.images = camelizeKeys(imgs);
          });
      }));
    })
    .then(() => {
      res.send(resultProducts);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
