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

// For customers to get their order info
// router.get('/orders', checkAdmin, (req, res, next) => {
//   const userId = req.token.userId;
//   res.send(`userId = ${userId}`);
//   // knex('customers')
//   //   .where('id', userId)
//   //   .first()
//   //   .then((customer) => {
//   //     if (!customer) {
//   //       throw boom.notFound('Invalid customer');
//   //     }
//   //
//   //     res.send(sanitizeCustomer(camelizeKeys(customer)));
//   //   })
//   //   .catch((err) => {
//   //     next(err);
//   //   });
// });

module.exports = router;
