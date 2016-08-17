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
const {
  sanitizeCustomer,
  processShipAddress,
  verifySameAddress
} = require('../modules/utils');

// For customers to get their info (populate forms / pull to client on login)
// Route tested and working
router.get('/api/customer', checkAuth, (req, res, next) => {
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

// For admins to get all customers
// Route tested and working
router.get('/api/admin/customers', checkAdmin, (req, res, next) => {
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
router.patch('/api/customer', checkAuth, ev(val.patch), (req, res, next) => {
  const id = req.token.userId;
  res.send(req.body);

});

// For customers to update their own info
router.patch('/api/admin/customer/:id', checkAdmin, ev(val.patchAdmin),
  (req, res, next) => {
    const id = req.params.id;

    // Needed for explicit null conversion from 'null'
    if (req.body.deleted === 'null') {
      req.body.deleted = null;
    }




    res.send(req.body);

});

// Customers: Create Customer (with or without proper registration security).
// req.body: firstName, lastName, [phone], email, [userName], [password], addressLine1, [addressLine2], addressCity, addressState, addressZip, addressCountry, shipFirstName, shipLastName, shipAddressLine1, [shipAddressLine2], shipAddressCity, shipAddressState, shipAddressZip, shipAddressCountry
// Route tested and working
router.post('/api/customers', ev(val.post), (req, res, next) => {
  let cust = processShipAddress(req.body);
  const isSameAddress = verifySameAddress(cust);

// !!!!!!!!!!! Needs address verification still !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // Promisify an if - avoid userName creation if omitted
  new Promise((resolve, reject) => {
    if (!cust.userName || !cust.password) {
      const err = new Error();
      err.userAndPassword = true;

      return reject(err);
    }

    resolve();
  })
  .then(() => {
    return knex('customers')
      .where('user_name', cust.userName)
      .first()
  })
  .then((exists) => {
    if (exists) {
      throw boom.conflict('User Name already exists');
    }

    return bcrypt.hash(cust.password, 12);
  })
  .then((hashedPassword) => {
    delete cust.password;
    cust.hashedPassword = hashedPassword;

    return;
  })
  .catch((err) => {
    // Skip to here if no userName and password in request
    if (err.userAndPassword) {
      return;
    }

    throw err;
  })
  .then(() => {
    return knex('customers')
      .insert(decamelizeKeys(cust), '*');
  })
  .then((newCust) => {
    res.send(sanitizeCustomer(camelizeKeys(newCust[0])));
  })
  .catch((err) => {
    next(err);
  });
});

// For customers to delete themselves
// Route tested and working
router.delete('/api/customers', checkAuth, (req, res, next) => {
  const id = req.token.userId;

  knex('customers')
    .where('id', id)
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
        .where('id', id)
        .update(toUpdate, '*');
    })
    .then((delCustomers) => {
      res.send(sanitizeCustomer(camelizeKeys(delCustomers[0])));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
