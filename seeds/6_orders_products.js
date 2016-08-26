
exports.seed = function(knex) {
  return knex('orders_products').del()
    .then(() => {
      return knex('orders_products').insert([{
        id:1,
        order_id: 1,
        product_id: 1,
        price: 14.95
      }, {
        id:2,
        order_id: 2,
        product_id: 5,
        price: 14.95
      }, {
        id:3,
        order_id: 2,
        product_id: 7,
        price: 14.95
      }, {
        id:4,
        order_id: 1,
        product_id: 5,
        price: 14.95
      }, {
        id:5,
        order_id: 3,
        product_id: 3,
        price: 14.95
      }, {
        id:6,
        order_id: 2,
        product_id: 4,
        price: 14.95
      }, {
        id:7,
        order_id: 3,
        product_id: 1,
        price: 14.95
      }, {
        id:8,
        order_id: 5,
        product_id:3,
        price: 14.95
      }, {
        id:9,
        order_id: 1,
        product_id: 4,
        price: 14.95
      }, {
        id:10,
        order_id: 2,
        product_id: 2,
        price: 14.95
      }, {
        id:11,
        order_id: 1,
        product_id: 1,
        price: 14.95
      }, {
        id:12,
        order_id: 4,
        product_id: 3,
        price: 14.95
      }, {
        id:13,
        order_id: 3,
        product_id: 2,
        price: 14.95
      }, ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('orders_products_id_seq', (SELECT MAX(id) FROM orders_products));"
      );
    });
};
