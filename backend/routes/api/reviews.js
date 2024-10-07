const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Get all Reviews of the Current User
router.get('/current/reviews', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });
    return res.json(reviews);
})

// Get all Reviews by a Spot's id
router.get('/:spotId', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.id
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
router.post('/:spotId', requireAuth, async (req, res) => {
    const {
        spotId,
        userId,
        review,
        stars
    } = req.body;

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

    await Review.create(req.body);

    return res.json(res.body);
})

// Add an Image to a Review based on the Review's id
    //error: Couldn't find a Review with the specified id
    //error: Cannot add any more images because there is a maximum of 10

// Edit a Review
router.post('/:SpotId', requireAuth, async (req, res) => {
    const {
        spotId,
        userId,
        review,
        stars
    } = req.body;

    //error: Validation error
    if (!review || !stars) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }   
        })
    }

    //error: Couldn't find a Review with the specified id "Review couldn't be found"
    const reviewToEdit = await Review.findByPk(req.params.id);
    if (!reviewToEdit) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    await Review.update(req.body, reviewToEdit.id); // should id be on the end of reviewToEdit?
    return res.json(res.body);
})

// Delete a Review
router.delete('/:id', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }
    await review.destroy();
    return res.json({message: "Successfully deleted"});
})

// Delete a Review Image



module.exports = router;