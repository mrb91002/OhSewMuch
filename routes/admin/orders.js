'use strict';

const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAdmin } = require('../../modules/middleware');
const boom = require('boom');
const ev = require('express-validation');
const express = require('express');
const knex = require('../../knex');
const router = express.Router();// eslint-disable-line new-cap
const val = require('../../validations/orders');

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
    });
});

module.exports = router;
