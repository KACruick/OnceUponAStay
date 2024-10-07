const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');

// Get all Reviews of the Current User
router.get('/current/reviews', async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });
    return res.json(reviews);
})

// Get all Reviews by a Spot's id
router.get('/:spotId', async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.id
        }
    });
    return res.json(reviews);
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId', async (req, res) => {
    const {
        spotId,
        userId,
        review,
        stars
    } = req.body;
    return res.json({message: "successfully created a new review"});
})

// Add an Image to a Review based on the Review's id


// Edit a Review
router.post('/:SpotId', async (req, res) => {
    const {
        spotId,
        userId,
        review,
        stars
    } = req.body;
    return res.json({message: "successfully edited a review"});
})

// Delete a Review
router.delete('/:id', async (req, res) => {
    const review = await Review.findByPk(req.params.id);
    await review.destroy();
    return res.json({message: "successfully deleted a review"});
})

// Delete a Review Image



module.exports = router;