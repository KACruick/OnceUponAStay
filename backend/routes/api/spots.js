const express = require('express')
const router = express.Router();

const { User, Spot, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');

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
    
    // Parse latitudes and ensure they are numbers
    minLat = minLat ? parseFloat(minLat) : undefined;
    maxLat = maxLat ? parseFloat(maxLat) : undefined;
    minLng = minLng ? parseFloat(minLng) : undefined;
    maxLng = maxLng ? parseFloat(maxLng) : undefined;
    minPrice = minPrice ? parseFloat(minPrice) : undefined;
    maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;

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
          const avgStarRating = await calculateAvgStarRating(spot.id);
          const previewImage = await getPreviewImage(spot.id);
          return {
            ...spot.toJSON(),
            avgStarRating,
            previewImage,
          };
        })
    );

    let response;
    ///if there are no page and size adjustments, return the spots with details without including page and size
    if (page === 1 && size === 20) {
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

    return res.status(200).json(response);    

});



//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where : {
            ownerId: req.user.id
        }
    })
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
    return res.json({ Spots: spotsWithDetails });
})

//helper function for calculating average rating and numReviews for get details of a spot from id 
function calculateExtraDetails(spot){
   
    // Calculate average rating
    let totalStars = 0;
    let reviewCount = 0;
    spot.Reviews.forEach((review) => {
        totalStars += review.stars;
        reviewCount++;
    });

    if (reviewCount > 0) {
        spot.numReviews = reviewCount;
        spot.avgStarRating = parseFloat((totalStars / reviewCount).toFixed(1));

    } else {
        spot.avgStarRating = "no reviews yet";
        spot.numReviews = 0;
    }
    delete spot.Reviews; 
    return spot;

}

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: ['stars']
            }, 
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName'],
            }
        ]
    });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    //needs num of reviews and avg rating
    let final = calculateExtraDetails(spot.toJSON())
    return res.json(final);
})

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    //error: Validation error
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude must be within -180 and 180",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day must be a positive number"
            }
        })
    }
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    return res.status(201).json(newSpot);
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const {spotId} = req.params;
    const {
        url,
        preview
    } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);
    //error: Couldn't find a Spot with the specified id
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //check if current user is the owner of the spot
    if (spot.ownerId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    //create and add the image
    const newImage = await SpotImage.create({
        url,
        preview,
        spotId
    });
    return res.status(201).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
});

//Edit a Spot
router.put('/:id', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    const spot = await Spot.findByPk(req.params.id);

    //error: Couldn't find a Spot with the specified id
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //check if owner of spot
    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: 'Forbidden - You are not the owner of this spot'})
    }

    //error: Validation error
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude must be within -180 and 180",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day must be a positive number"
            }
        })
    }

    const updated = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    return res.json({
        id: updated.id,
        ownerId: updated.ownerId,
        address: updated.address,
        city: updated.city,
        state: updated.state,
        country: updated.country,
        lat: updated.lat,
        lng: updated.lng,
        name: updated.name,
        description: updated.description,
        price: updated.price,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
    });
})

// Delete a Spot
router.delete('/:id', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);
    //check if spot exists
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //check if current user is the owner of the spot
    if (spot.ownerId !== userId) {
        return res.status(403).json({
            message: "Forbidden - You are not the owner of this spot"
        })
    }
    await spot.destroy();
    return res.json({message: "Successfully deleted"});
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params;

    //check if spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //find all reviews for the spot
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    //error: Couldn't find a Review with the specified id
    if (!reviews) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    return res.json({ Reviews: reviews });
})

// Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, async (req, res) => {
    const {
        review,
        stars
    } = req.body;
    const spotId = req.params.id;
    const userId = req.user.id;

    // error for body validation
    if (!review || !stars) {
        return res.status(400).json({
            message: "Validation Error",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }
        })
    }
    //error: couldn't find spot from id 
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //error: Review from the current user already exists for the Spot
    const existingReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: userId
        }
    });
    if (existingReview) {
        return res.status(500).json({ 
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    });

    return res.status(201).json(newReview);
})


//get all bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    //check if spot exists
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    
    let bookings;

    //if you are NOT the owner of the spot
    if (spot.ownerId !== req.user.id) {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ['spotId', 'startDate', 'endDate'],
        });
    }
    // if you are the owner of the spot
    if (spot.ownerId === req.user.id) {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });
    }
    return res.status(200).json({ Bookings: bookings });
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId);
    //check to make sure the user is not the owner of the spot
    if(spot.ownerId === userId) {
        return res.status(404).json({
            message: "Cannot book your own spot"
        })
    }

    //error: Validation error 400
    if (!startDate || !endDate) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                startDate: "startDate cannot be in the past",
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }
    //error: Couldn't find a Spot
    
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    //error: Booking conflict
    const existingBooking = await Booking.findOne({
        where: {
            spotId,
            startDate: startDate,
            endDate: endDate
        }
    });
    if (existingBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
    const newBooking = await Booking.create({
        spotId,
        userId: req.user.id,
        startDate,
        endDate
    });
    return res.json(newBooking);
})


module.exports = router;