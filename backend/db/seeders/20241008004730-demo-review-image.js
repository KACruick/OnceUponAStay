'use strict';

const { Review } = require('../models');
const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const reviewImages = [
      {
        reviewId: 1,
        url: "https://placehold.co/600x400/00ff00/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 2,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    try {
      await queryInterface.bulkInsert('ReviewImages', reviewImages, {});
      console.log('Review Images seeded successfully');
    } catch (error) {
      console.error('Error seeding Review Images:', error);
    }
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
