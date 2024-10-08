'use strict';

const { Spot } = require('../models');
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const spotImages = [
      {
        spotId: 1,
        url: "https://placehold.co/600x400/ffcc00/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        url: "https://placehold.co/600x400/cc00ff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    try {
      await queryInterface.bulkInsert('SpotImages', spotImages, {});
      console.log('Spot Images seeded successfully');
    } catch (error) {
      console.error('Error seeding Spot Images:', error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
