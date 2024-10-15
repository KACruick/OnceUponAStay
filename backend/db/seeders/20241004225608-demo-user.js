'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'user1first',
        lastName: 'user1last',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'user2first',
        lastName: 'user2last',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        firstName: 'user3first',
        lastName: 'user3last',
        email: 'user2@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
      },
      {
        firstName: 'user4first',
        lastName: 'user3last',
        email: 'user2@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),

      },
      {
        firstName: 'user5first',
        lastName: 'user3last',
        email: 'user2@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5'),
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
