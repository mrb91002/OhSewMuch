'use strict';

const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth, processToken } = require('../modules/middleware');
const boom = require('boom');
const ev = require('express-validation');
const express = require('express');
const knex = require('../knex');
const router = express.Router(); // eslint-disable-line new-cap
const val = require('../validations/orders');

// For customers to get their order info
// Route tested and working
router.get('/orders', checkAuth, ev(val.get), (req, res, next) => {
  const customerId = req.token.userId;
  let orders;
  let lineItems;
  const items = [];

  knex('orders')
    .where('customer_id', customerId)
    .orderBy('created_at', 'desc')
    .then((allOrders) => {
      orders = camelizeKeys(allOrders);

      return Promise.all(orders.map((order) => {
        return knex('orders_products')
          .select('order_id', 'price', 'product_id')
          .where('order_id', order.id);
      }));
    })
    .then((ordersProducts) => {
      lineItems = camelizeKeys(ordersProducts);
      for (const order of lineItems) {
        for (const product of order) {
          items.push(product);
        }
      }

      return Promise.all(items.map((item) => {
        return knex('products')
          .where('id', item.productId)
          .first();
      }));
    })

    // eslint-disable-next-line max-statements
    .then((lineProducts) => {
      for (const item of items) {
        for (const product of camelizeKeys(lineProducts)) {
          if (product.id === item.productId) {
            item.product = product;
            item.product.price = item.price;
            delete item.price;
            delete product.deleted;
            delete product.createdAt;
            delete product.updatedAt;
            delete product.unitsInStock;
            delete item.productId;
            break;
          }
        }
      }

      const finalOrders = [];
      let inFinalOrders = false;

      for (const it of items) {
        for (const ord of finalOrders) {
          if (it.orderId === ord.id) {
            ord.products.push(it.product);
            inFinalOrders = true;
            break;
          }
        }
        if (inFinalOrders) {
          inFinalOrders = false;
          continue;
        }
        it.products = [];
        it.products.push(it.product);
        delete it.product;
        it.id = it.orderId;
        delete it.orderId;
      }

      res.send(items);
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
  else if (!order.customerId) {
    return next(boom.unauthorized('Invalid customer ID'));
  }

  let orderProducts = order.products;
  let newOrder;
  let customer;

  delete order.products;

  if (orderProducts.length === 0) {
    return next(boom.notAcceptable('Order must contain products'));
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
            if (!promoExists) {
              throw boom.notFound('Promo code is invalid');
            }

            if (new Date(promoExists.expiresAt) <= new Date()) {
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

      return knex('orders')
        .insert(decamelizeKeys(order), '*');
    })
    .then((orders) => {
      newOrder = camelizeKeys(orders[0]);

      // Needs to map the products array and get prices and insert order id #'s
      return Promise.all(orderProducts.map((prod) => {
        return knex('products')
          .where('id', prod)
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

      return knex('orders_products')
        .insert(decamelizeKeys(orderProducts), '*');
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
