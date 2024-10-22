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
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
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
      {
        reviewId: 5,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 6,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 7,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 8,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 11,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 12,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 13,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 16,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 17,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 20,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 21,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 22,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 23,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 25,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 29,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 30,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 31,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 32,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 33,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 34,
        url: "https://placehold.co/600x400/ff0000/png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {validate: true});
  },
  

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
