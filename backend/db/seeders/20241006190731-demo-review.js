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
        userId: 3,
        review: 'So cool!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Amazing!',
        stars: 5,
      },
      // starting spot 2
      // {
      //   spotId: 2,
      //   userId: 3,
      //   review: 'Not enough parking',
      //   stars: 3,
      // },
      // {
      //   spotId: 2,
      //   userId: 3,
      //   review: 'Really close to train stops.',
      //   stars: 4,
      // },
      // {
      //   spotId: 2,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 2,
      //   userId: 3,
      //   review: 'Not enough beds.',
      //   stars: 2,
      // },
      // {
      //   spotId: 2,
      //   userId: 3,
      //   review: 'It was a place to stay',
      //   stars: 4,
      // },
      // starting spot 3
      // {
      //   spotId: 3,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 3,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 3,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 3,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      //starting spot 4
      // {
      //   spotId: 4,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 4,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 4,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      //starting spot 5
      // {
      //   spotId: 5,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 5,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 5,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      //starting spot 6
      // {
      //   spotId: 6,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 6,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 6,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      //starting spot 7
      // {
      //   spotId: 7,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 7,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 7,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      //starting spot 8
      // {
      //   spotId: 8,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 8,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 8,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // starting spot 9
      // {
      //   spotId: 9,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 9,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 9,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      ///starting spot 10
      // {
      //   spotId: 10,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 10,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
      // {
      //   spotId: 10,
      //   userId: 3,
      //   review: 'Amazing!',
      //   stars: 5,
      // },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2] }
    }, {});
  }
  
};
