const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

//delete a review image 
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const image = await ReviewImage.findByPk(imageId);
    const reviewId = image.reviewId;
    const review = await Review.findByPk(reviewId);
    const reviewOwnerId = review.userId;

    //check if image exists
    if (!image) {
        return res.status(404).json({
            message: "Review Image couldn't be found"
        })
    }
    //check if current user is the owner of the review
    if (reviewOwnerId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    await image.destroy();
    return res.json({message: "successfully deleted"});

});

module.exports = router;