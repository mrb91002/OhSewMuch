'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('promos', (table) => {
    table.increments();
    table.integer('product_id')
      .nullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
    table.dateTime('expires_at').notNullable();
    table.string('promo_code', 10).notNullable().unique();
    table.float('discount_rate', 8, 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('promos');
};
