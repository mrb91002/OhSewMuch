'use strict';

const { camelizeKeys } = require('humps');
const boom = require('boom');
const ev = require('express-validation');
const express = require('express');
const knex = require('../knex');
const router = express.Router();// eslint-disable-line new-cap
const val = require('../validations/promos');

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
