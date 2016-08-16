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
const { checkAuth, checkAdmin } = require('../modules/middleware');
const { sanitizeCustomer } = require('../modules/utils');

// Customers: Create Customer (with or without proper registration security).
// req.body: firstName, lastName, [phone], email, [userName], [password], addressLine1, [addressLine2], addressCity, addressState, addressZip, addressCountry, shipFirstName, shipLastName, shipAddressLine1, [shipAddressLine2], shipAddressCity, shipAddressState, shipAddressZip, shipAddressCountry
// Route tested and working
router.post('/api/customers', ev(val.post), (req, res, next) => {
  const cust = req.body;

  // Path to take if a userName and password are present.
  if (cust.userName && cust.password) {
    knex('customers')
      .where('user_name', cust.userName)
      .first()
      .then((exists) => {
        if (exists) {
          throw boom.conflict('User Name already exists');
        }

        return bcrypt.hash(cust.password, 12);
      })
      .then((hashedPassword) => {
        delete cust.password;
        cust.hashedPassword = hashedPassword;

        return knex('customers')
          .insert(decamelizeKeys(cust), '*');
      })
      .then((newCust) => {
        res.send(sanitizeCustomer(camelizeKeys(newCust[0])));
      })
      .catch((err) => {
        next(err);
      });
  }
  // Path to take if a userName and password are not present.
  else {
    knex('customers')
      .insert(decamelizeKeys(cust), '*')
      .then((newCust) => {
        res.send(sanitizeCustomer(camelizeKeys(newCust[0])));
      })
      .catch((err) => {
        next(err);
      });
  }
});

// Route tested and working
router.get('/api/customers', checkAuth, (req, res, next) => {
  const userId = req.token.userId;

  knex('customers')
    .where('id', userId)
    .first()
    .then((customer) => {
      if (!customer) {
        throw boom.notFound('Invalid customer');
      }

      res.send(sanitizeCustomer(camelizeKeys(customer)));
    })
    .catch((err) => {
      next(err);
    });
});

// Route tested and working
router.delete('/api/customers', checkAuth, (req, res, next) => {
  const userId = req.token.userId;

  knex('customers')
    .where('id', userId)
    .first()
    .then((exists) => {
      if (!exists) {
        throw boom.notFound('Invalid customer');
      }

      const date = new Date();
      const toUpdate = decamelizeKeys({
        deleted: date,
        updatedAt: date
      });

      return knex('customers')
        .where('id', userId)
        .update(toUpdate, '*');
    })
    .then((delCustomers) => {
      res.send(sanitizeCustomer(camelizeKeys(delCustomers[0])));
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/api/customers', checkAdmin, ev(val.patch), (req, res, next) => {

  // console.log(req.cookies.admin);
  res.sendStatus(200);
});

module.exports = router;
