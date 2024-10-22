'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
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
      {
        ownerId: 1,
        address: '125 Day Star Lane',
        city: 'Fairfax',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Log Cabin',
        description: 'A cozy log cabin in the middle of nowhere.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '562 Orange Street',
        city: 'Anaheim',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Family Home',
        description: 'A famiy friendly house near Disney Land.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '12 Pike St',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Seattle apartment',
        description: 'A cute apartment near Pike Place Market in Seattle.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '4319 Broadway Ave',
        city: 'Helena',
        state: 'MT',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Ranch House',
        description: 'House on a ranch on property with wild horses.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '923 Jefferson',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Historic house',
        description: 'Historic house in City Center.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '2839 56th Ave',
        city: 'Forks',
        state: 'WA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Twilight House',
        description: 'Bella"s house in the Twilight movie.',
        price: 100,
      },
      {
        ownerId: 5,
        address: '821 Bourbon St',
        city: 'New Orleans',
        state: 'LA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'New Orleans apartment',
        description: 'Small apartment with Terrace overlooking the French Quarter.',
        price: 100,
      },
      {
        ownerId: 5,
        address: '123 106th St',
        city: 'Bar Harbor',
        state: 'ME',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Costal House',
        description: 'House overlooking beach.',
        price: 100,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
