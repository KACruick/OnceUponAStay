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

//Add Query Filters to Get All Spots
// router.get('/', 
//     [
//         check("page")
//             .optional()
//             .isInt({min: 1})
//             .withMessage("Page must be greater than or equal to 1"),
//         check("size")
//             .optional()
//             .isInt({min: 1})
//             .withMessage("Size must be greater than or equal to 1"),
//         check("minLat")
//             .optional()
//             .isFloat({min: -90, max: 90})
//             .withMessage("Minimum latitude is invalid"),
//         check("maxLat")
//             .optional()
//             .isFloat({min: -90, max: 90})
//             .withMessage("Maximum latitude is invalid"),
//         check("minLng")
//             .optional()
//             .isFloat({min: -180, max: 180})
//             .withMessage("Minimum longitude is invalid"),
//         check("maxLng")
//             .optional()
//             .isFloat({min: -180, max: 180})
//             .withMessage("Maximum longitude is invalid"),
//         check("minPrice")
//             .optional()
//             .isFloat({min: 0})
//             .withMessage("Minimum price must be greater than or equal to 0"),
//         check("maxPrice")
//             .optional()
//             .isFloat({min: 0})
//             .withMessage("Maximum price must be greater than or equal to 0"),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 message: "Bad Request",
//                 errors: errors.array()
//             });
//         }
// });

//Get all Spots with Page/size Query Parameters
// router.get('/', async (req, res) => {
//     let {
//         page = 1,
//         size = 20,
//         minLat,
//         maxLat,
//         minLng,
//         maxLng,
//         minPrice,
//         maxPrice
//     } = req.query;

//     page = parseInt(page);
//     size = parseInt(size);

//     //limit max page size
//     if (size > 20) {
//         size = 20;
//     }
//     if (page < 1) {
//         page = 1;
//     }

//     // filters for query parameters 
//     const filters = {};

//     if (minLat) filters.lat = { ...filters.lat, [Op.gte]: parseFloat(minLat) };
//     if (maxLat) filters.lat = { ...filters.lat, [Op.lte]: parseFloat(maxLat) };

//     if (minLng) filters.lng = { ...filters.lng, [Op.gte]: parseFloat(minLng) };
//     if (maxLng) filters.lng = { ...filters.lng, [Op.lte]: parseFloat(maxLng) };

//     if (minPrice) filters.price = { ...filters.price, [Op.gte]: parseFloat(minPrice) };
//     if (maxPrice) filters.price = { ...filters.price, [Op.lte]: parseFloat(maxPrice) };

//     // Fetch spots from the database with applied filters
//     const spots = await Spot.findAll({
//         where: filters,
//         limit: size,
//         offset: (page - 1) * size,
//         attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
//     });

//     return res.json({
//         Spots: spots,
//         page: page,
//         size: size
//     });

// })

