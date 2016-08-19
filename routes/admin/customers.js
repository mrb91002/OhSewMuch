'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const val = require('../validations/customers');
const { checkAdmin } = require('../modules/middleware');
const {
  sanitizeCustomer,
  processShipAddress,
  verifySameAddress
} = require('../modules/utils');

// For admins to get all customers
// Route tested and working
router.get('/customers', checkAdmin, (req, res, next) => {
  knex('customers')
    .then((customers) => {
      let custs = camelizeKeys(customers);
      custs = custs.map((cust) => {
        delete cust.hashedPassword;
        delete cust.createdAt;
        delete cust.updatedAt;

        return cust;
      });
      res.send(custs);
    })
    .catch((err) => {
      next(err);
    });
});

// For customers to update their own info
router.patch('/customer/:id', checkAdmin, ev(val.patchAdmin),
  (req, res, next) => {
    const id = req.params.id;

    // Needed for explicit null conversion from 'null'
    if (req.body.deleted === 'null') {
      req.body.deleted = null;
    }

// WORKING HERE!!!!!!!!!!!!!!


    res.send(req.body);

});
module.exports = router;
