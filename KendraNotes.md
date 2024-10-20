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
      // {
      //   spotId: 9,
      //   userId: 1,
      //   startDate: new Date('2025-01-01'),
      //   endDate: new Date('2025-01-05'),
      // },
      // {
      //   spotId: 10,
      //   userId: 1,
      //   startDate: new Date('2025-02-01'),
      //   endDate: new Date('2025-02-05'),
      // },


// Helper function to calculate average star rating
const calculateAvgStarRating = async (spotId) => {
    const reviews = await Review.findAll({ where: { spotId } });
    //console.log("reviews: ", reviews);
    let totalStars = 0;
    let reviewCount = 0;
    reviews.forEach((review) => {
        totalStars += review.stars
        reviewCount++;
    })

    if (reviewCount > 0) {
        return parseFloat((totalStars / reviewCount).toFixed(1));
    } else {
        return "No reviews yet";
    }
};
 
// Helper function to retrieve preview image URL
const getPreviewImage = async (spotId) => {
    const image = await SpotImage.findOne({ where: { spotId } });
    if (image) {
      return image.url;
    } else {
      return 'No preview image available'; // Return null if no preview image is found
    }
};

router.get('/', validateQueryParams, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const filters = {};
    if (minLat) filters.lat = { [Op.gte]: minLat };
    if (maxLat) filters.lat = { ...filters.lat, [Op.lte]: maxLat };
    if (minLng) filters.lng = { [Op.gte]: minLng };
    if (maxLng) filters.lng = { ...filters.lng, [Op.lte]: maxLng };
    if (minPrice) filters.price = { [Op.gte]: minPrice };
    if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };


    const spots = await Spot.findAll({
        where: filters,
        limit: size,
        offset: (page - 1) * size,
        
    });

    //create an array of promises to fetch the average rating and preview image for each spot
    const spotsWithDetails = await Promise.all(
        spots.map(async (spot) => {
          const avgRating = await calculateAvgStarRating(spot.id);
          const previewImage = await getPreviewImage(spot.id);
          return {
            ...spot.toJSON(),
            avgRating,
            previewImage,
          };
        })
    );

    let response;
    ///if there are no filters, return the spots with details without including page and size
    if (filters.length === 0 && !page && !size) {
        response = {
            Spots: spotsWithDetails,
        };
    }
    else {
        response = {
            Spots: spotsWithDetails,
            page: parseInt(page),
            size: parseInt(size),
        };
    }

    res.status(200).json(response);    

});

////OLD 
//helper function for calculating average rating and preview image from array for get all spots
function finalSpots(spotsArray){
    const final = spotsArray.map((spot) => {
        // Calculate average rating
        let totalStars = 0;
        let reviewCount = 0;
        spot.Reviews.forEach((review) => {
            totalStars += review.stars;
            reviewCount++;
        });
  
        if (reviewCount > 0) {
            spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));
        } else {
            spot.avgRating = null;
        }
        delete spot.Reviews; 
  
        // Calculate preview image
        spot.SpotImages.forEach((image) => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        });
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image available';
        }
        delete spot.SpotImages; 
  
        return spot;
      })
      return final;
}

//helper function for calculating average rating and numReviews for get details of a spot from id 
function calcAvgRating(spot){
   
        // Calculate average rating
        let totalStars = 0;
        let reviewCount = 0;
        spot.Reviews.forEach((review) => {
            totalStars += review.stars;
            reviewCount++;
        });
  
        if (reviewCount > 0) {
            spot.numReviews = reviewCount;
            spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));

        } else {
            spot.avgRating = null;
        }
        delete spot.Reviews; 
        return spot;
    
}

// Middleware for validating query parameters
const validateQueryParams = (req, res, next) => {
    const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errors = {};
  
    // Validate page
    if (page < 1) {
      errors.page = "Page must be greater than or equal to 1";
    }
  
    // Validate size
    if (size < 1 || size > 20) {
      errors.size = "Size must be between 1 and 20";
    }
  
    // Validate optional filters
    if (minLat && (isNaN(minLat) || minLat < -90 || minLat > 90)) {
      errors.minLat = "Minimum latitude is invalid";
    }
    if (maxLat && (isNaN(maxLat) || maxLat < -90 || maxLat > 90)) {
      errors.maxLat = "Maximum latitude is invalid";
    }
    if (minLng && (isNaN(minLng) || minLng < -180 || minLng > 180)) {
      errors.minLng = "Minimum longitude is invalid";
    }
    if (maxLng && (isNaN(maxLng) || maxLng < -180 || maxLng > 180)) {
      errors.maxLng = "Maximum longitude is invalid";
    }
    if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
    if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }
  
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: "Bad Request", errors });
    }
  
    // Set validated query parameters
    req.query.page = parseInt(page);
    req.query.size = parseInt(size);
    req.query.minLat = minLat ? parseFloat(minLat) : undefined;
    req.query.maxLat = maxLat ? parseFloat(maxLat) : undefined;
    req.query.minLng = minLng ? parseFloat(minLng) : undefined;
    req.query.maxLng = maxLng ? parseFloat(maxLng) : undefined;
    req.query.minPrice = minPrice ? parseFloat(minPrice) : undefined;
    req.query.maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
  
    next();
};

// Get all Spots with query filters 
// router.get('/', validateQueryParams, async (req, res ) => {
//     let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
//       req.query;
    
    
//     const limit = size ?? 20;
//     const offset = page ? (page - 1) * size : 0;
//     const where = {};

//     // Apply filters based on the query parameters
//   if (minLat !== undefined && maxLat !== undefined) {
//     where.lat = {
//       [Op.between]: [minLat, maxLat]
//     };
//   } else if (minLat !== undefined) {
//     where.lat = {
//       [Op.gte]: minLat
//     };
//   } else if (maxLat !== undefined) {
//     where.lat = {
//       [Op.lte]: maxLat
//     };
//   }

//   if (minLng !== undefined && maxLng !== undefined) {
//     where.lng = {
//       [Op.between]: [minLng, maxLng]
//     };
//   } else if (minLng !== undefined) {
//     where.lng = {
//       [Op.gte]: minLng
//     };
//   } else if (maxLng !== undefined) {
//     where.lng = {
//       [Op.lte]: maxLng
//     };
//   }

//   if (minPrice !== undefined && maxPrice !== undefined) {
//     where.price = {
//       [Op.between]: [minPrice, maxPrice]
//     };
//   } else if (minPrice !== undefined) {
//     where.price = {
//       [Op.gte]: minPrice
//     };
//   } else if (maxPrice !== undefined) {
//     where.price = {
//       [Op.lte]: maxPrice
//     };
//   }


//     const spots = await Spot.findAll({
//         where,
//         limit,
//         offset,
//         include:[
//             {
//                 model: Review,
//                 attributes: ['stars']
//             }, 
//             {
//                 model: SpotImage,
//                 attributes: ['url', 'preview'],
//             }
//         ]
//     });
//     let spotsArray = [];

//   // Push each spot into an array to be able to add the average rating and preview image
//     spots.forEach((spot) => {
//       spotsArray.push(spot.toJSON());
//     });
// ////
//    const final = finalSpots(spotsArray);
   
//    if (page === 1 && size === 20) {
//     return res.json({
//         Spots: final,
//     })
//    } else {
//     return res.json({
//         Spots: final,
//         page,
//         size,
//     })
//    }
  
// });