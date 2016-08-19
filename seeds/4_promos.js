
exports.seed = function(knex) {
  return knex('promos').del()
    .then(() => {
      return knex('promos').insert([
        {
        id:1,
        product_id: 1,
        expires_at: new Date('2016-06-26 14:26:16 UTC'),
        promo_code: 'Monster',
        discount_rate: 10,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:2,
        product_id: 1,
        expires_at: new Date('2016-06-26 14:26:16 UTC'),
        promo_code: 'test1',
        discount_rate: 20,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      } ,{
        id:3,
        product_id: 2,
        expires_at: new Date('2016-06-26 14:26:16 UTC'),
        promo_code: 'Monster1',
        discount_rate: 10,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      } ,{
        id:4,
        product_id: null,
        expires_at: new Date('2016-06-26 14:26:16 UTC'),
        promo_code: 'Monster2',
        discount_rate: 10,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('promos_id_seq', (SELECT MAX(id) FROM promos));"
      );
    });
};
