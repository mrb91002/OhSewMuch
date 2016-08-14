'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.string('category').notNullable();
    table.decimal('price').notNullable();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.integer('units_in_stock').notNullable().defaultTo(0);
    table.dateTime('deleted').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
