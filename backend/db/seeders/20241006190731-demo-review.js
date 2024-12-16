'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      //spot 1
      {
        spotId: 1,
        userId: 2,
        review: 'Great spot!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Amazing!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Its OK',
        stars: 4,
      },
      {
        spotId: 1,
        userId: 4,
        review: 'So cool!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Amazing!',
        stars: 5,
      },

      //starting spot 2
      {
        spotId: 2,
        userId: 2,
        review: 'Not enough parking',
        stars: 3,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Really close to train stops.',
        stars: 4,
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Its was fine',
        stars: 3,
      },
      {
        spotId: 2,
        userId: 5,
        review: 'Not enough beds.',
        stars: 2,
      },
      
      //starting spot 3
      {
        spotId: 3,
        userId: 2,
        review: 'Amazing!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Amazing!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Amazing!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Amazing!',
        stars: 5,
      },

      //starting spot 4
      {
        spotId: 4,
        userId: 2,
        review: 'Sucked so much',
        stars: 1,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Could have been better',
        stars: 3,
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Meh, it was fine',
        stars: 3,
      },

      //starting spot 5
      {
        spotId: 5,
        userId: 2,
        review: 'Amazing!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: 'So cool!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 4,
        review: 'My family had the best time!',
        stars: 4,
      },

      //starting spot 6
      {
        spotId: 6,
        userId: 2,
        review: 'It was a great place, but it could have been closer to town',
        stars: 4,
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Nice place but the bed was uncomfortable',
        stars: 4,
      },
      {
        spotId: 6,
        userId: 4,
        review: 'We loved our stay!',
        stars: 5,
      },

      //starting spot 7
      {
        spotId: 7,
        userId: 2,
        review: 'Was too close to the sketchy part of town',
        stars: 3,
      },
      {
        spotId: 7,
        userId: 3,
        review: 'There was no dish soap or towels in the bathroom',
        stars: 2,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'It did have a nice view',
        stars: 4,
      },

      //starting spot 8
      {
        spotId: 8,
        userId: 2,
        review: 'Nice house, but the ceiling was leaking rain water',
        stars: 3,
      },
      {
        spotId: 8,
        userId: 3,
        review: 'Too expensive for what you get',
        stars: 2,
      },
      {
        spotId: 8,
        userId: 4,
        review: 'It was a cool place to stay while visiting',
        stars: 4,
      },

      //starting spot 9
      {
        spotId: 9,
        userId: 2,
        review: 'Amazing! We were so close to everything!',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 3,
        review: 'It was too loud at night. Too close to the nightclubs.',
        stars: 3,
      },
      {
        spotId: 9,
        userId: 4,
        review: 'Everything was really nice and well maintained',
        stars: 5,
      },

      //starting spot 10
      {
        spotId: 10,
        userId: 2,
        review: 'Great place to stay while visiting the beach!',
        stars: 5,
      },
      {
        spotId: 10,
        userId: 3,
        review: 'Amazing!',
        stars: 5,
      },
      {
        spotId: 10,
        userId: 4,
        review: 'We loved this place!',
        stars: 5,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
  
};
