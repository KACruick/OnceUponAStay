const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

//delete a spot image 
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;

    const image = await SpotImage.findByPk(imageId);

    //check if image exists
    if (!image) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    const spot = await Spot.findByPk(image.spotId);
    //check if current user is the owner of the spot
    if (spot.owwnerId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await image.destroy();
    return res.json({message: "Successfully deleted"});
});

module.exports = router;