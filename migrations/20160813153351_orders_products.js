'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('orders_products', (table) => {
    table.increments();
    table.integer('order_id')
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE')
      .index();
    table.integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .index();
    table.decimal('price').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders_products');
};
