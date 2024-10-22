'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 2,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-05'),
    },
    {
      spotId: 2,
      userId: 2,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-05'),
    },
    {
      spotId: 3,
      userId: 3,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-05'),
    },
    {
      spotId: 4,
      userId: 3,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-05'),
    },
    {
      spotId: 5,
      userId: 4,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-05'),
    },
    {
      spotId: 6,
      userId: 4,
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-05-05'),
    },
    {
      spotId: 7,
      userId: 5,
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-05-05'),
    },
    {
      spotId: 8,
      userId: 5,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-05'),
    },
    {
      spotId: 9,
      userId: 1,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-05'),
    },
    {
      spotId: 10,
      userId: 1,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-05'),
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
