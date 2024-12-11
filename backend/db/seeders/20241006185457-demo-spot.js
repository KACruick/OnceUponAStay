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
      //spot 1
      {
        ownerId: 1,
        address: '23 Willowbrook Drive',
        city: 'Little Wrenham',
        state: 'Wiltshire',
        country: 'England',
        lat: null,
        lng: null,
        name: 'Cozy Cottage',
        description: "Nestled in the heart of the picturesque English countryside, this charming cottage offers a tranquil escape from the hustle and bustle of city life. Surrounded by rolling green hills and lush gardens, the cottage exudes rustic charm with its thatched roof, stone walls, and flower-filled window boxes. Inside, you'll find a cozy living area with a wood-burning fireplace, exposed wooden beams, and vintage decor that captures the essence of country living. Step outside onto the private patio to take in breathtaking views, or enjoy a cup of tea in the garden.",
        price: 125,
      },
      //spot 2
      {
        ownerId: 1,
        address: '125 Day Star Lane',
        city: 'McArthur',
        state: 'CA',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'Log Cabin',
        description: "Escape to a secluded log cabin hidden deep in the serene forests of northern California. This rustic retreat is surrounded by towering redwoods and offers breathtaking views of the untouched wilderness. Built from hand-hewn logs and designed with comfort in mind, the cabin blends rugged charm with cozy modern amenities.",
        price: 115,
      },
      //spot 3
      {
        ownerId: 1,
        address: '123 Rosenweg',
        city: 'Garmisch',
        state: 'Partenkirchen',
        country: 'Germany',
        lat: null,
        lng: null,
        name: 'Traditional German Home',
        description: "Discover the charm of traditional German living in this beautiful home, nestled in a picturesque village in the Bavarian countryside. Combining timeless architecture with modern comforts, this residence offers an authentic taste of Germany’s rich culture and serene lifestyle.",
        price: 160,
      },
      //spot 4
      {
        ownerId: 1,
        address: '12 Pike St',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'Modern Seattle apartment',
        description: "Welcome to your sleek and stylish modern apartment in the heart of Seattle, WA. This urban oasis blends contemporary design with ultimate convenience, offering the best of city living. With large windows that flood the space with natural light, you'll enjoy stunning views of the Seattle skyline, the iconic Space Needle, and the surrounding waterfront.",
        price: 250,
      },
      //spot 5
      {
        ownerId: 1,
        address: '1234 Big Sky Ranch Road',
        city: 'Helena',
        state: 'MT',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'Ranch House',
        description: "Escape to the heart of Montana with this stunning ranch house, where wide-open spaces meet rustic charm. Set on acres of breathtaking land, this home offers the perfect blend of comfort and adventure. Surrounded by rolling hills, vast plains, and breathtaking mountain views, it’s an idyllic retreat for nature lovers and those looking for peace and solitude.",
        price: 300,
      },
      //spot 6
      {
        ownerId: 1,
        address: '923 Jefferson St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'Townhouse',
        description: "Step into urban elegance with this stunning townhouse located just steps away from Philadelphia’s iconic City Hall. Perfectly blending historic charm with modern sophistication, this residence offers the ultimate city living experience in the heart of Philadelphia.",
        price: 200,
      },
      //spot 7
      {
        ownerId: 1,
        address: '1525 Calle del Sol',
        city: 'Manzana',
        state: 'Mendoza',
        country: 'Argentina',
        lat: null,
        lng: null,
        name: 'Casa de los Gatos',
        description: "Welcome to this spacious, traditional Argentine home, where the charm of rustic elegance meets the warmth of local culture. Set on expansive grounds, this grand house boasts high ceilings, classic wood finishes, and large windows that allow for an abundance of natural light. Inside, you'll find beautifully decorated rooms, each with a unique blend of vintage and modern touches. As you wander through the garden, you’ll encounter a group of friendly feral cats, who have adopted the property as their home. These curious and affectionate cats will delight in your company as you explore the lush grounds, adding a special touch of local charm to your stay.",
        price: 100,
      },
      //spot 8
      {
        ownerId: 1,
        address: '821 Bourbon St',
        city: 'New Orleans',
        state: 'LA',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'Royal Oaks Mansion',
        description: "Experience the elegance and charm of New Orleans with this stunning mansion, located just steps from the iconic French Quarter. The grand home is a perfect blend of historic Southern architecture and modern luxury, with stately columns, intricate ironwork balconies, and beautifully restored hardwood floors. Inside, you'll find spacious rooms with high ceilings and large windows that allow for plenty of natural light.",
        price: 175,
      },
      //spot 9
      {
        ownerId: 5,
        address: '3682 Oceanview Drive',
        city: 'Cannon Beach',
        state: 'OR',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'Seaside Retreat Beach House',
        description: "Nestled along the rugged beauty of the Oregon coast, this charming beach house offers the perfect blend of comfort and coastal adventure. With breathtaking views of the Pacific Ocean, this two-story retreat features large windows that let in natural light and stunning sunsets. The open-concept living area boasts cozy furnishings, a stone fireplace, and a fully equipped kitchen perfect for gathering with loved ones.",
        price: 325,
      },
      //spot 10
      {
        ownerId: 5,
        address: '124 Thistlewood Lane',
        city: 'Inverloch',
        state: 'Highlands',
        country: 'Scotland',
        lat: null,
        lng: null,
        name: 'Dunhaven Castle',
        description: "Step back in time and experience the magic of staying in a historic Scottish castle, nestled amidst rolling hills and lush greenery. Perfect for large gatherings, whether it’s a family reunion, a milestone celebration, or a corporate retreat, this majestic space offers both grandeur and modern comfort.",
        price: 500,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
