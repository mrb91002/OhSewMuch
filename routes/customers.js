'use strict';

const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth } = require('../modules/middleware');
const {
  sanitizeCustomer,
  processShipAddress,
  verifySameAddress,
  getPrimaryAddress,
  getShipAddress,
  embedAddresses,
  mergeAddresses
} = require('../modules/utils');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const ev = require('express-validation');
const express = require('express');
const knex = require('../knex');
const router = express.Router(); // eslint-disable-line new-cap
const val = require('../validations/customers');
const Lob = require('lob')(process.env.LOB_APIKEY);

// For customers to get their info (populate forms / pull to client on login)
// Route tested and working
router.get('/customer', checkAuth, (req, res, next) => {
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

// For customers to update their own info
router.patch('/customer', checkAuth, ev(val.patch), (req, res, next) => {
  const id = req.token.userId;
  const cust = processShipAddress(req.body);
  let isSameAddress;
  let primaryAddress = getPrimaryAddress(cust);
  let shipAddress = getShipAddress(cust);

  knex('customers')
    .where('id', id)
    .first()
    .then((existingCustomer) => {
      if (!existingCustomer) {
        throw boom.notFound('Invalid customer id');
      }

      // Used to populate cust from existingCustomer
      mergeAddresses(existingCustomer, primaryAddress, shipAddress);

      // Explicit check for same address
      isSameAddress = verifySameAddress(primaryAddress, shipAddress);

      return Lob.verification.verify(decamelizeKeys(primaryAddress))
        .then((lobPriRes) => {
          // Guard clause for partial match
          if (lobPriRes.message) {
            const err = boom.notFound(JSON.stringify(camelizeKeys(lobPriRes)));

            err.json = true;
            throw err;
          }

          primaryAddress = camelizeKeys(lobPriRes.address);

          // Skip evaluating shipping Address
          if (isSameAddress) {
            shipAddress = camelizeKeys(lobPriRes.address);

            return;
          }

          return Lob.verification.verify(decamelizeKeys(shipAddress))
            .then((lobShipRes) => {
              // Guard clause for partial match
              if (lobShipRes.message) {
                const jsonLobRes = JSON.stringify(camelizeKeys(lobShipRes));
                const err = boom.notFound(jsonLobRes);

                err.json = true;
                throw err;
              }

              shipAddress = camelizeKeys(lobShipRes.address);

              return;
            })
            .catch((err) => {
              if (err.message === 'address not found') {
                err.message = `Shipping ${err.message}`;
              }

              throw err;
            });
        })
        .catch((err) => {
          if (err.message === 'address not found') {
            err.message = `Primary ${err.message}`;
          }

          throw err;
        });
    })
    .then(() => {
      // Addresses verified
      embedAddresses(cust, primaryAddress, shipAddress);
      if (!cust.password) {
        return;
      }

      return bcrypt.hash(cust.password, 12)
        .then((hashedPassword) => {
          delete cust.password;
          cust.hashedPassword = hashedPassword;

          return;
        });
    })
    .then(() => {
      // Password verified and converted to hashedPassword
      if (!cust.userName) {
        return;
      }

      return knex('customers')
        .where('user_name', cust.userName)
        .first()
        .then((existingUserName) => {
          if (existingUserName) {
            throw boom.conflict('User name already exists');
          }

          return;
        });
    })
    .then(() => {
      // UserName Verified
      cust.updatedAt = new Date();

      return knex('customers')
        .where('id', id)
        .update(decamelizeKeys(cust), '*');
    })
    .then((newCusts) => {
      res.send(sanitizeCustomer(camelizeKeys(newCusts[0])));
    })
    .catch((err) => {
      // Handle lob API errors for address not found
      const primaryAddressErr = err.message === 'Primary address not found';
      const shipAddressErr = err.message === 'Shipping address not found';

      if (primaryAddressErr || shipAddressErr) {
        throw boom.notFound(err.message);
      }

      // Pass through for other error types
      throw err;
    })
    .catch((err) => {
      next(err);
    });
});

// Customers: Create Customer (with or without proper registration security).
// req.body: firstName, lastName, [phone], email, [userName], [password],
// addressLine1, [addressLine2], addressCity, addressState, addressZip,
// addressCountry, shipFirstName, shipLastName, shipAddressLine1,
// [shipAddressLine2], shipAddressCity, shipAddressState, shipAddressZip,
// shipAddressCountry
// Route tested and working
router.post('/customers', ev(val.post), (req, res, next) => {
  const cust = processShipAddress(req.body);
  let primaryAddress = getPrimaryAddress(cust);
  let shipAddress = getShipAddress(cust);
  const isSameAddress = verifySameAddress(primaryAddress, shipAddress);

  Lob.verification.verify(decamelizeKeys(primaryAddress))
    .then((lobPriRes) => {
      // Guard clause for partial match
      if (lobPriRes.message) {
        const err = boom.notFound(JSON.stringify(camelizeKeys(lobPriRes)));

        err.json = true;
        throw err;
      }
      primaryAddress = camelizeKeys(lobPriRes.address);

      // Skip evaluating shipping Address
      if (isSameAddress) {
        shipAddress = camelizeKeys(lobPriRes.address);

        return;
      }

      return Lob.verification.verify(decamelizeKeys(shipAddress))
        .then((lobShipRes) => {
          // Guard clause for partial match
          if (lobShipRes.message) {
            const jsonLobRes = JSON.stringify(camelizeKeys(lobShipRes));
            const err = boom.notFound(jsonLobRes);

            err.json = true;
            throw err;
          }

          shipAddress = camelizeKeys(lobShipRes.address);

          return;
        })
        .catch((err) => {
          if (err.message === 'address not found') {
            err.message = `Shipping ${err.message}`;
          }

          throw err;
        });
    })
    .catch((err) => {
      if (err.message === 'address not found') {
        err.message = `Primary ${err.message}`;
      }

      throw err;
    })
    .then(() => {
      // Addresses Verified
      embedAddresses(cust, primaryAddress, shipAddress);

      // If username or password are blank, avoid un check and password hash.
      if (!cust.userName || !cust.password) {
        // Strip any possible data in either.
        delete cust.userName;
        delete cust.password;

        return;
      }

      return knex('customers')
        .where('user_name', cust.userName)
        .first()
        .then((exists) => {
          if (exists) {
            throw boom.conflict('User name already exists');
          }

          return bcrypt.hash(cust.password, 12);
        })
        .then((hashedPassword) => {
          delete cust.password;
          cust.hashedPassword = hashedPassword;

          return;
        });
    })
    .then(() => {
      return knex('customers')
        .insert(decamelizeKeys(cust), '*');
    })
    .then((newCusts) => {
      res.send(sanitizeCustomer(camelizeKeys(newCusts[0])));
    })
    .catch((err) => {
      // Handle lob API errors for address not found
      const primaryAddressErr = err.message === 'Primary address not found';
      const shipAddressErr = err.message === 'Shipping address not found';

      if (primaryAddressErr || shipAddressErr) {
        throw boom.notFound(err.message);
      }

      // Pass through for other error types
      throw err;
    })
    .catch((err) => {
      next(err);
    });
});

// For customers to delete themselves
// Route tested and working
router.delete('/customer', checkAuth, (req, res, next) => {
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
