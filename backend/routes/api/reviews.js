const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where: { userId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url'],
                        where: {
                            preview: true
                        }
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
                
            }
        ]
    });

    if (!reviews.length) { 
        return res.status(200).json({
            message: "No reviews yet"
        })
    }

    return res.json(reviews);
});




// Add an Image to a Review based on the Review's id
router.post('/:id/images', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.id;
    const review = await Review.findByPk(reviewId);
    const { url } = req.body;
    //check if review exists
    if (!review) {
        return res.status(404).json({
            message: "Review not found"
        })
    }
    //check if owner of review 
    if (review.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    //error: Cannot add any more images because there is a maximum of 10
    //check if maximum of 10 images has been reached
    const reviewImages = await ReviewImage.count({
        where: {
            reviewId
        }
    });
    if (reviewImages >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }
    //create and add the image
    const newImage = await ReviewImage.create({
        url,
        reviewId
    });
    return res.json({
        id: newImage.id,
        url: newImage.url
    })
});

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const {
        review,
        stars
    } = req.body;
    const { user } = req;
    const { reviewId } = req.params;

    const reviewToEdit = await Review.findByPk(reviewId);

    //check if review exists
    if (!reviewToEdit) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    //check if owner of review
    if (reviewToEdit.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    //error: Validation error
    if (!review || typeof stars !== 'number' || stars < 1 || stars > 5) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }   
        })
    }

    //update review
    reviewToEdit.review = review;
    reviewToEdit.stars = stars;
    await reviewToEdit.save();
    return res.json(reviewToEdit);
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



module.exports = router;