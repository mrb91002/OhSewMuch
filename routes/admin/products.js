'use strict';

const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAdmin } = require('../../modules/middleware');
const boom = require('boom');
const ev = require('express-validation');
const express = require('express');
const knex = require('../../knex');
const router = express.Router(); // eslint-disable-line new-cap
const val = require('../../validations/products');

router.get('/products', checkAdmin, (_req, res, next) => {
  let resultProducts;

  knex('products')
    .then((products) => {
      resultProducts = camelizeKeys(products);

      return Promise.all(resultProducts.map((prod) => {
        return knex('product_images')
          .where('product_id', prod.id)
          .then((imgs) => {
            prod.images = imgs;
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

router.post('/products', checkAdmin, ev(val.post), (req, res, next) => {
  const productInfo = req.body;
  let images = productInfo.images;
  let product;

  if (images.length === 0) {
    return next(boom.notAcceptable('Product must contain at least 1 image'));
  }

  delete productInfo.images;

  knex('products')
    .insert(decamelizeKeys(productInfo), '*')
    .then((products) => {
      product = camelizeKeys(products[0]);

      images = images.map((img) => {
        img.productId = product.id;

        return img;
      });

      return knex('product_images')
        .insert(decamelizeKeys(images), '*');
    })
    .then((newImages) => {
      product.images = newImages;

      res.send(product);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/products/:id', checkAdmin, ev(val.patch), (req, res, next) => {
  const updatedProduct = req.body;
  let images = updatedProduct.images;
  let newProduct;

  delete updatedProduct.images;
  const id = req.params.id;

  if (images.length === 0) {
    return next(boom.notAcceptable('Product must contain at least 1 image'));
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
      newProduct = camelizeKeys(products[0]);
      images = images.map((image) => {
        image.productId = newProduct.id;

        return image;
      });

      return knex('product_images')
        .where('product_id', newProduct.id)
        .del();
    })
    .then(() => {
      return knex('product_images')
        .insert(decamelizeKeys(images), '*');
    })
    .then((newImages) => {
      newProduct.images = newImages;

      res.send(newProduct);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
