const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");
const { check, validationResult } = require('express-validator');



// Get all Spots
// router.get('/', async (req, res) => {
//     const spots = await Spot.findAll({
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
//     const spotsList = [];
//     spots.forEach((spot) => {
//         spotsList.push(spot.toJSON());
//     });
//     const spotsFinal = spotsList.map((spot) => {
//         //calculate average rating
//         let totalStars = 0;
//         let reviewCount = 0;
//         spot.Review.forEach((review) => {
//           totalStars += review.stars;
//           reviewCount++;
//         });
//         let averageRating;
//         if (reviewCount === 0) {
//           averageRating = 0;
//         } else {
//           averageRating = totalStars / reviewCount;
//         }
//         spot.averageRating = averageRating;

//         //call preview image
//         spot.SpotImage.forEach((image) => {
//             if (image.preview === true) {
//                 spot.previewImage = image.url;
//             }
//         });
//         if (!spot.previewImage) {
//             spot.previewImage = 'No preview image available';
//         }

//         return spot;
//     })
//     res.json({Spots: spotsFinal});
// })

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },

    });
    return res.json(spots);
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
            }
        ]
    });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    return res.json(spot);
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

    await Spot.create(req.body);
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
router.put('/:id', async (req, res) => {
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
    //error: Couldn't find a Spot with the specified id
    const spot = await Spot.findByPk(req.params.id);
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
router.post('/:id/bookings', async (req, res) => {
    const {
        //spotId, ?? 
        //userId, ??
        startDate,
        endDate
    } = req.body;

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

//Add Query Filters to Get All Spots


//Get all Spots with Page/size Query Parameters



module.exports = router;