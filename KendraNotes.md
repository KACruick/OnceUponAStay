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

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url', 'preview'],
            }
        ]
        
    });
    let spotsArray = [];
    spots.forEach((spot) => {
        spotsArray.push(spot.toJSON());
      });
     const final = finalSpots(spotsArray);
    return res.json({ spots: final });
})