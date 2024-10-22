const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

//delete a spot image 
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const userId = req.user.id;
    const spotImage = await SpotImage.findByPk(imageId);

    //check if image exists
    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    //check if current user is the owner of the spot
    if (spotImage.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await spotImage.destroy();
    return res.json({message: "successfully deleted"});
});

module.exports = router;