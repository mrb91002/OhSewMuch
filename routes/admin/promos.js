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
router.post('/promos', checkAdmin, ev(val.post), (req, res, next) => {
  const promoToInsert = req.body;

  knex('promos')
    .where('promo_code', promoToInsert.promoCode)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.conflict('Promo code already exists');
      }
      return knex('promos')
        .insert(decamelizeKeys(promoToInsert), '*');
    })
    .then((promos) => {
      res.send(camelizeKeys(promos[0]));
    })
    .catch((err) => {
      next (err);
    });
});

// Route to delete a promos
// Route tested and working
router.delete('/promo/:id', checkAdmin, ev(val.delete), (req, res, next) => {
  knex('promos')
    .where('id', req.params.id)
    .first()
    .then((exists) => {
      if (!exists) {
        throw boom.notFound('Invalid promo ID');
      }

      const delPromo = { expiresAt: new Date() };
      return knex('promos')
        .update(decamelizeKeys(delPromo), '*');
    })
    .then((promos) => {
      res.send(camelizeKeys(promos[0]));
    })
    .catch((err) => {
      next (err);
    });
});

module.exports = router;
