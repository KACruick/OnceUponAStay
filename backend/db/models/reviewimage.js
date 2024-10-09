'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId', onDelete: 'CASCADE' });
    }
  }
  ReviewImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reviews',
        key: 'id',
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      
    },
    updatedAt: {
      type: DataTypes.DATE,
      
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
    tableName: 'ReviewImages',
  });
  return ReviewImage;
};