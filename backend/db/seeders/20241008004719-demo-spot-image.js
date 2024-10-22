'use strict';


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
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
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        url: "https://placehold.co/600x400/00ccff/png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {validate: true});
  },
   
   

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
