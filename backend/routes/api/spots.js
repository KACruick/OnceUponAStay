const express = require('express')
const router = express.Router();

const { User, Spot, Review, Booking, SpotImage, reviewImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");
const { check, validationResult } = require('express-validator');

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

// Get all Spots with query filters 
router.get('/', async (req, res ) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
      req.query;
  
    const limit = size ?? 20;
    const offset = page ? (page - 1) * size : 0;
    const where = {};

    // Apply filters based on the query parameters
  if (minLat !== undefined && maxLat !== undefined) {
    where.lat = {
      [Op.between]: [minLat, maxLat]
    };
  } else if (minLat !== undefined) {
    where.lat = {
      [Op.gte]: minLat
    };
  } else if (maxLat !== undefined) {
    where.lat = {
      [Op.lte]: maxLat
    };
  }

  if (minLng !== undefined && maxLng !== undefined) {
    where.lng = {
      [Op.between]: [minLng, maxLng]
    };
  } else if (minLng !== undefined) {
    where.lng = {
      [Op.gte]: minLng
    };
  } else if (maxLng !== undefined) {
    where.lng = {
      [Op.lte]: maxLng
    };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    where.price = {
      [Op.between]: [minPrice, maxPrice]
    };
  } else if (minPrice !== undefined) {
    where.price = {
      [Op.gte]: minPrice
    };
  } else if (maxPrice !== undefined) {
    where.price = {
      [Op.lte]: maxPrice
    };
  }


    const spots = await Spot.findAll({
        where,
        limit,
        offset,
        include:[
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

  // Push each spot into an array to be able to add the average rating and preview image
    spots.forEach((spot) => {
      spotsArray.push(spot.toJSON());
    });
////
   const final = finalSpots(spotsArray);
  res.json({ Spots: final });
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
    console.log("spot: ", spot.toJSON())
    let final = calcAvgRating(spot.toJSON())
    return res.json({ spot: final });
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

    await Spot.create({
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
    return res.json({message: "successfully created a new spot"});
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
    //error: Couldn't find a Spot with the specified id

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    await Spot.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    return res.json({message: "successfully updated the spot"});
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
    if (spot.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden - You are not the owner of this spot"
        })
    }
    await spot.destroy();
    return res.json({message: "successfully deleted the spot"});
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params;
    const reviews = await Review.findAll({
        where: {
            spotId
        }
    });

    //error: Couldn't find a Review with the specified id
    if (!reviews) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    return res.json(reviews);
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

    return res.json(newReview);
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
    //check if owner of spot
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    //get all bookings for a Spot based on the Spot's id
    const bookings = await Booking.findAll({
        where: {
            spotId
        }
    });
    return res.json(bookings);
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

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
    const spot = await Spot.findByPk(req.params.id);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    //error: Booking conflict
    const existingBooking = await Booking.findOne({
        where: {
            spotId: req.params.id,
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
        spotId: req.params.id,
        userId: req.user.id,
        startDate,
        endDate
    });
    return res.json(newBooking);
})


module.exports = router;