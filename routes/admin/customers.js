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
  verifySameAddress,
  getPrimaryAddress,
  getShipAddress,
  embedAddresses,
  mergeAddresses,
} = require('../modules/utils');
const Lob = require('lob')(process.env.LOB_APIKEY);

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

// For admins to update customers
// Route tested and working
router.patch('/customer/:id', checkAdmin, ev(val.patchAdmin),
  (req, res, next) => {
  const id = req.params.id;
  const cust = processShipAddress(req.body);
  let isSameAddress;
  let primaryAddress = getPrimaryAddress(cust);
  let shipAddress = getShipAddress(cust);

  // Needed for explicit null conversion from 'null' in body
  if (cust.deleted === 'null') {
    cust.deleted = null;
  }

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
        })
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

module.exports = router;
