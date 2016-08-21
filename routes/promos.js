'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const ev = require('express-validation');
const val = require('../validations/promos');
const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth } = require('../modules/middleware');

// Route for customers to get the details of a promo code.
router.get('/promo/:code', ev(val.get), (req, res, next) => {
  knex('promos')
    .where('promo_code', req.params.code)
    .first()
    .then((promoExists) => {
      if (!promoExists) {
        throw boom.notFound('Promo not found');
      }

      const promo = camelizeKeys(promoExists);
      delete promo.updatedAt;

      res.send(promo);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
