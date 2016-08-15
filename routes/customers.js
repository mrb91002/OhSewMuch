'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validate = require('../validations/customers');
const { checkAuth } = require('../modules/middleware');

// Customers: Create Customer (with or without proper registration security).
// req.body: firstName, lastName, [phone], email, [userName], [password], addressLine1, [addressLine2], addressCity, addressState, addressZip, addressCountry, shipFirstName, shipLastName, shipAddressLine1, [shipAddressLine2], shipAddressCity, shipAddressState, shipAddressZip, shipAddressCountry
router.post('/api/customers', ev(validate.post), (req, res, next) => {
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
        const custResponse = camelizeKeys(newCust[0]);

        delete custResponse.id;
        delete custResponse.deleted;
        delete custResponse.admin;
        delete custResponse.hashedPassword;
        delete custResponse.createdAt;
        delete custResponse.updatedAt;
        res.send(custResponse);
      })
      .catch((err) => {
        next(err);
      })
  }
  // Path to take if a userName and password are not present.
  else {
    knex('customers')
      .insert(decamelizeKeys(cust), '*')
      .then((newCust) => {
        const custResponse = camelizeKeys(newCust[0]);

        delete custResponse.id;
        delete custResponse.deleted;
        delete custResponse.admin;
        delete custResponse.hashedPassword;
        delete custResponse.createdAt;
        delete custResponse.updatedAt;
        res.send(custResponse);
      })
      .catch((err) => {
        next(err);
      })
  }
});

router.get('/api/customers', checkAuth, (req, res, next) => {
  const userId = req.token.userId;

  knex('customers')
    .where('id', userId)
    .first()
    .then((exists) => {
      if (!exists) {
        throw boom.notFound('Invalid customer');
      }

      const user = camelizeKeys(exists);

      delete user.id;
      delete user.admin;
      delete user.hashedPassword;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.deleted;
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
