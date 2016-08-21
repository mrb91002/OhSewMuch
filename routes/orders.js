'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const val = require('../validations/orders');
const { checkAuth, processToken } = require('../modules/middleware');

// For customers to get their order info
// Route tested and working
router.get('/orders', checkAuth, ev(val.get), (req, res, next) => {
  const customerId = req.token.userId;

  knex('orders')
    .where('customer_id', customerId)
    .then((orders) => {
      res.send(camelizeKeys(orders));
    })
    .catch((err) => {
      next(err);
    });
});

// For customers to create an order
// Products array must be an array of product_id numbers only.
router.post('/orders', ev(val.post), processToken, (req, res, next) => {
  const order = req.body;

  if (req.token) {
    order.customerId = req.token.userId;
  }
  else if (!order.customerId){
    return next(boom.unauthorized('Invalid customer ID'));
  }

  let orderProducts = order.products;
  let newOrder;
  let customer;

  delete order.products;

  if (orderProducts.length === 0) {
    throw boom.notAcceptable('Order must contain products');
  }

  knex('customers')
    .where('id', order.customerId)
    .first()
    .then((customerExists) => {
      if (!customerExists) {
        throw boom.unauthorized('Invalid customer ID');
      }

      customer = camelizeKeys(customerExists);

      if (order.promoId) {
        return knex('promos')
          .where('id', order.promoId)
          .first()
          .then((promoExists) => {
            promoExists = camelizeKeys(promoExists);
            if(!promoExists) {
              throw boom.notFound('Promo code is invalid');
            }

            if(new Date(promoExists.expiresAt) <= new Date()) {
              throw boom.forbidden('Promo code is expired');
            }
          });
      }
    })
    .then(() => {
      order.shipFirstName = customer.shipFirstName;
      order.shipLastName = customer.shipLastName;
      order.shipAddressLine1 = customer.shipAddressLine1;
      order.shipAddressLine2 = customer.shipAddressLine2;
      order.shipAddressCity = customer.shipAddressCity;
      order.shipAddressState = customer.shipAddressState;
      order.shipAddressZip = customer.shipAddressZip;
      order.ShipAddressCountry = customer.shipAddressCountry;
      console.log(order);
      return knex('orders')
        .insert(decamelizeKeys(order), '*');
    })
    .then((orders) => {
      newOrder = camelizeKeys(orders[0]);

      // console.log(orderProducts);
      // Needs to map the products array and get prices and insert order id #'s
      return Promise.all(orderProducts.map((prod) => {
        return knex('products')
          .where('id', prod.id)
          .first();
      }));
    })
    .then((products) => {
      orderProducts = camelizeKeys(products);
      for (const product of orderProducts) {
        product.orderId = newOrder.id;
        product.productId = product.id;
        delete product.id;
        delete product.createdAt;
        delete product.updatedAt;
        delete product.category;
        delete product.name;
        delete product.description;
        delete product.dimensions;
        delete product.unitsInStock;
        delete product.deleted;
      }
      console.log(orderProducts);
      return knex('orders_products')
        .insert(decamelizeKeys(orderProducts), '*')
    })
    .then((newOrderProducts) => {
      for (const product of newOrderProducts) {
        delete product.id;
      }

      newOrder.products = camelizeKeys(newOrderProducts);
      delete newOrder.cancelled;
      delete newOrder.createdAt;
      delete newOrder.updatedAt;
      delete newOrder.shipDate;

      res.send(newOrder);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
