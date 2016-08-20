'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const val = require('../../validations/promos');
const { checkAdmin } = require('../../modules/middleware');

// Route to create a promo
// Route needs testing from JS (didn't figure out how to send a date with http)
router.post('/promos', checkAdmin, ev(val.post), (req, res, next) => {
  const promo = req.body;

  knex('promos')
    .where('promo_code', promo.promoCode)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.conflict('Promo code already exists');
      }
      return knex('promos')
        .insert(decamelizeKeys(promo), '*');
    })
    .then((promos) => {
      res.send(camelizeKeys(promos[0]));
    })
    .catch((err) => {
      next (err);
    });
});

// Route to immediately expire a promo
// Route tested and working
router.delete('/promo/:id', checkAdmin, ev(val.delete), (req, res, next) => {
  const id = req.params.id;

  knex('promos')
    .where('id', id)
    .first()
    .then((exists) => {
      if (!exists) {
        throw boom.notFound('Invalid promo ID');
      }

      const toUpdate = { expiresAt: new Date() };

      return knex('promos')
        .update(decamelizeKeys(toUpdate), '*');
    })
    .then((promos) => {
      res.send(camelizeKeys(promos[0]));
    })
    .catch((err) => {
      next (err);
    });
});

module.exports = router;
