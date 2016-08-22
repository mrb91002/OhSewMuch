'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const val = require('../../validations/orders');
const { checkAdmin } = require('../../modules/middleware');

// For admins to cancel an order
router.delete('/orders/:id', checkAdmin, ev(val.delete), (req, res, next) => {
  const id = req.params.id;

  knex('orders')
    .where('id', id)
    .first()
    .then((orderExists) => {
      if (!orderExists) {
        throw boom.notFound('Invalid order ID');
      }

      orderExists = camelizeKeys(orderExists);

      if (orderExists.shipDate) {
        throw boom.conflict('Order has already been marked as shipped');
      }

      if (orderExists.cancelled) {
        throw boom.conflict('Order has already been cancelled');
      }

      const date = new Date();
      const toUpdate = { cancelled: date, updatedAt: date };

      return knex('orders')
        .where('id', id)
        .update(decamelizeKeys(toUpdate), '*');
    })
    .then((updatedOrders) => {
      res.send(camelizeKeys(updatedOrders[0]));
    })
    .catch((err) => {
      next(err);
    })
});

module.exports = router;
