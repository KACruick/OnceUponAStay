const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { where } = require('sequelize');

// Get all Reviews of the Current User
// router.get('/current', requireAuth, async (req, res) => {
//     const userId = req.user.id;
//     const reviews = await Review.findAll({
//         where: { userId },
//         include: [
//             {
//                 model: User,
//                 attributes: ['id', 'firstName', 'lastName']
//             },
//             {
//                 model: Spot,
//                 attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
//                 include: [
//                     {
//                         model: SpotImage,
//                         attributes: ['url'],
//                         where: {
//                             preview: true
//                         }
//                     }
//                 ]
//             },
//             {
//                 model: ReviewImage,
//                 attributes: ['id', 'url'],
                
//             }
//         ]
//     });

//     if (!reviews.length) { 
//         return res.status(200).json({
//             message: "No reviews yet"
//         })
//     }

//     return res.json(reviews);
// });




// // Add an Image to a Review based on the Review's id
//     //error: Couldn't find a Review with the specified id
//     //error: Cannot add any more images because there is a maximum of 10

// // Edit a Review
// router.post('/:SpotId', requireAuth, async (req, res) => {
//     const {
//         spotId,
//         userId,
//         review,
//         stars
//     } = req.body;

//     //error: Validation error
//     if (!review || !stars) {
//         return res.status(400).json({
//             message: "Bad Request",
//             errors: {
//                 review: "Review text is required",
//                 stars: "Stars must be an integer from 1 to 5"
//             }   
//         })
//     }

//     //error: Couldn't find a Review with the specified id "Review couldn't be found"
//     const reviewToEdit = await Review.findByPk(req.params.id);
//     if (!reviewToEdit) {
//         return res.status(404).json({
//             message: "Review couldn't be found"
//         })
//     }

//     await Review.update(req.body, reviewToEdit.id); // should id be on the end of reviewToEdit?
//     return res.json(res.body);
// })

// // Delete a Review
// router.delete('/:id', requireAuth, async (req, res) => {
//     const review = await Review.findByPk(req.params.id);

//     if (!review) {
//         return res.status(404).json({
//             message: "Review couldn't be found"
//         })
//     }
//     await review.destroy();
//     return res.json({message: "Successfully deleted"});
// })

// Delete a Review Image



module.exports = router;