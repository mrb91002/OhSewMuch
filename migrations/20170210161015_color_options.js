'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('color_options', (table) => {
    table.increments();
    table.integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
    table.integer('display_order').unsigned().notNullable();
    table.string('color').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('color_options')
};
