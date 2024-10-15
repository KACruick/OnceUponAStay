const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");


// Get all Spots
// router.get('/', async (req, res) => {
//     const spots = await Spot.findAll({
//         include:[
//             {
//                 model: Review,
//                 attributes: ['stars']
//             }, {
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
    const spot = await Spot.findByPk(req.params.id);
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
    //require authentication
    //error: Couldn't find a Spot with the specified id


// Edit a Spot
// router.post('/:id', async (req, res) => {
//     const {
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price
//     } = req.body;

//     //error: Validation error
//     if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
//         return res.status(400).json({
//             message: "Bad Request",
//             errors: {
//                 address: "Street address is required",
//                 city: "City is required",
//                 state: "State is required",
//                 country: "Country is required",
//                 lat: "Latitude is not valid",
//                 lng: "Longitude must be within -180 and 180",
//                 name: "Name must be less than 50 characters",
//                 description: "Description is required",
//                 price: "Price per day must be a positive number"
//             }
//         })
//     }
//     //error: Couldn't find a Spot with the specified id
//     const spot = await Spot.findByPk(req.params.id);
//     if (!spot) {
//         return res.status(404).json({
//             message: "Spot couldn't be found"
//         })
//     }

//     await Spot.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     });
//     return res.json({message: "successfully updated the spot"});
// })

// Delete a Spot
// router.delete('/:id', requireAuth, async (req, res) => {
//     const spot = await Spot.findByPk(req.params.id);
//     if (!spot) {
//         return res.status(404).json({
//             message: "Spot couldn't be found"
//         })
//     }
//     await spot.destroy();
//     return res.json({message: "successfully deleted the spot"});
// })

//Add Query Filters to Get All Spots


// Delete a Spot Image


module.exports = router;