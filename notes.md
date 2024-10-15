// numReviews: {
      //   type: Sequelize.INTEGER,
      //   calculateNumReviews(){
      //     const reviews = Review.findAll({
      //       where: {
      //         spotId: this.id
      //       }
      //     })
      //     return reviews.length;
      //   }

      // },
      // avgStarRating: {
      //   type: Sequelize.DECIMAL,
      //   calculateAvgStarRating(){
      //     const reviews = Review.findAll({
      //       where: {
      //         spotId: this.id
      //       }
      //     })
      //     const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
      //     const avgStarRating = totalStars / reviews.length; //round to 2 decimal places? 
      //     return avgStarRating;
      //   }
      // },