'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-05'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-02-01'),
        endDate: new Date('2023-02-05'),
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2] }
    }, {});
  }
};
