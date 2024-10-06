'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Cozy Cottage',
        description: 'A charming cottage in the heart of the city.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '456 Elm St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Modern Apartment',
        description: 'A modern apartment in the heart of the city.',
        price: 150,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2] }
    }, {});
  }
};
