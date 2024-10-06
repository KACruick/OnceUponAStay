'use strict';

let options = {}; //define schema here? 
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: false,
      },
      lng: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      numReviews: {
        type: Sequelize.INTEGER,
        calculateNumReviews(){
          const reviews = Review.findAll({
            where: {
              spotId: this.id
            }
          })
          return reviews.length;
        }

      },
      avgStarRating: {
        type: Sequelize.DECIMAL,
        calculateAvgStarRating(){
          const reviews = Review.findAll({
            where: {
              spotId: this.id
            }
          })
          const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
          const avgStarRating = totalStars / reviews.length; //round to 2 decimal places? 
          return avgStarRating;
        }
      },
      
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.dropTable(options);
  }
};