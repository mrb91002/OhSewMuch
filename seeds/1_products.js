'use strict';

/* eslint-disable max-len */

exports.seed = function(knex) {
  return knex('products').del()
    .then(() => {
      return knex('products').insert([{
        id: 1,
        name: 'Monster Tooth Fairy Pillow',
        category: 1,
        price: 14.99,
        description:
          'With the mouth being an actual pocket this monster tooth fairy pillow wants to gobble up that lost little tooth and hold it securely for the tooth fairy. It can be hung from the headboard, dresser knob or door handle. All of the features are appliqued onto fleece and then stuffed with the highest quality polyester fiberfill.  Colors available:  Pink, red, orange, yellow, green, blue and purple. Monster Tooth Fairy Poem: Wiggle wiggle Little tooth Mine fell out And here\'s the Proof. Measures: 4 1/2" x 4 1/2" NOTE: Please specify color(s) when ordering! This listing is for one Monster Tooth Fairy Pillow.',
        units_in_stock: 10,
        color_options: true,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        name: 'One Dinosaur Tail Costume',
        category: 2,
        price: 19.95,
        description:
          'This tail is a fun way to stimulate your child’s mind by getting them involved in make believe.  This tail also makes for a great Halloween costume or just for any day of the year! The tails are made out of fleece and measure approx. 22” long.  The straps around the waist each measure 12” and are secured with 5” of Velcro which makes them greatly adjustable to almost any size child’s waist.  I use only the highest quality of polyester fiberfill as it’s a lot softer and doesn’t lump up. The tails come in a rainbow of colors.  The combinations that I have listed are: -Green with red spike -Orange with purple spikes -Pink with green spikes -Red with yellow spikes -Purple with green spikes -Blue with orange spikes -Black with red spikes Length 22” (approx.) Waist straps 12” each (secured with 5” of Velcro) This listing is for ONE Dinosaur Tail. NOTE: Please specify color(s) when ordering!',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: true,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        name: 'One Baby Dinosaur Tail Costume',
        category: 2,
        price: 16.95,
        description:
          'This tail is a fun way to jump start your baby\'s imagination by getting them involved in make believe. This tail also makes for a great Halloween costume or just for any day of the year! The tails are made out of fleece and measure approx. 14” long. The straps around the waist each measure 12” and are secured with 6” of Velcro which makes them greatly adjustable to almost any size child’s waist. I use only the highest quality of polyester fiberfill as it’s a lot softer and doesn’t lump up. The tails come in a rainbow of colors. The combinations that I have listed are: -Green with red spike -Orange with purple spikes -Pink with green spikes -Red with yellow spikes -Purple with green spikes -Blue with orange spikes -Black with red spikes Length 14” (approx.) Waist straps 12” each (secured with 6” of Velcro) This listing is for ONE Dinosaur Tail.',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: true,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        name: 'Adventure Dinosaur Tail Costume',
        category: 2,
        price: 21.95,
        description:
          'This tail is a fun way to stimulate your child’s mind by getting them involved in make believe. This tail also makes for a great Halloween costume or just for any day of the year! The tails are made out of a polyester fleece and measure approx. 22" in length. The straps around the waist each measure 12" and are secured with 5" of Velcro which makes them greatly adjustable to almost any size child\'s waist. I use only the highest quality polyester fiberfill as it\'s a lot softer and doesn\'t lump up. This tail can be spot washed. Length 22” (approx.) Waist straps 12” each (secured with 5” of Velcro)',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: false,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        name: 'Kids Monster Art Apron',
        category: 3,
        price: 24.95,
        description:
          'This monster art apron will steal the heart of any little child that puts it on! Think of the hours of fun they will have drawing with the 10 WASHABLE Roseart Markers on their own little 3” x 5” pad of paper, each with their own compartment. Pens and pad are included with your purchase! This monster art apron is made to last in a sturdy 100% cotton denim with an adjustable neck strap for years of growing enjoyment. The bias tape fabric is personally selected and hand-made to fully coordinate with the rainbow of colors in the pack of washable markers. This monster art apron should be washed in cold water and either dried on low or air dried. Size: 18 width, 15 1/2" height (approx.) Ties at waist measure 17" each Neck strap measures 20" (adjustable)',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: false,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 6,
        name: 'Small Girls Cupcake Apron',
        category: 3,
        price: 14.95,
        description:
          'This little apron is sure to steal the heart of any little chef or baker especially since it comes with their own 7" wire whisk! It is made out of the all time favorite fabric "tossed cupcakes" by Robert Kaufman which is 100% cotton, for easy care and trimmed in a chocolate brown bias tape. There are three pockets across the front and the strap at the neck is adjustable for your child\'s perfect fit. Should fit a 2 to 5 year old. Size: 16 1/2" width, 15 1/2" height (approx.) Ties at waist measure 18" each Neck strap measures 20" (adjustable)',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: false,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 7,
        name: 'Small Shark Apron',
        category: 3,
        price: 14.95,
        description:
          'This little apron is sure to steal the heart of any little chef or baker especially since it comes with their own 7" wire whisk! It is made out of a fun under the sea shark print and trimmed in a black bias tape. There are three pockets across the front and the strap at the neck is adjustable for your child\'s perfect fit. Should fit a 2 to 5 year old. Size: 16 1/2" width, 15 1/2" height (approx.) Ties at the waist measure 18" each Neck strap measures 20" (adjustable)',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: false,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 8,
        name: 'Vinyl Monster Bib',
        category: 4,
        price: 10.95,
        description:
          'This pocketed vinyl bib is trimmed in a fun striped handmade bias tape. It is perfect for the toddler since it ties at the neck preventing the child from pulling it off like they could with Velcro. Wipe clean with a damp cloth. Note: please specify color(s) when ordering. This listing is for one Vinyl Monster Bib.',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: true,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 9,
        name: 'Superman/Batman Cape',
        category: 5,
        price: 19.95,
        description:
          'This is the perfect cape for your little SUPER HERO. It is reversible with both Batman and Superman and has a Velcro closure at the neck for safety. It is made from a cotton/poly blend of fabric so that when it is washed in cool water and dried on low heat it needs no ironing. The designs are appliqued on... not glued. It fits most children from 2 to 7 years old. Measures: 27" x 21" (21" from the back of the neck to the bottom hem) Message for large orders.',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: false,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 10,
        name: 'Reversible Superman Batman Superhero Cape Costume',
        category: 5,
        price: 19.95,
        description:
          'This is the perfect cape for your little SUPER HERO. It is reversible with both Batman and Superman and has a Velcro closure at the neck for safety. It is made from a cotton/poly blend of fabric so that when it is washed in cool water and dried on low heat it needs no ironing. The designs are appliqued on... not glued. It fits most children from 2 to 7 years old. Measures: 27" x 21" (21" from the back of the neck to the bottom hem) Message for large orders.',
        dimensions: '6" x 10"',
        units_in_stock: 10,
        color_options: false,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
        deleted: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));"
      );
    });
};
