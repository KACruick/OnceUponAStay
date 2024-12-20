const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

//add validation functions? 


// Helper function to retrieve preview image URL
const getPreviewImage = async (spotId) => {
    const image = await SpotImage.findOne({ where: { spotId } });
    if (image) {
      return image.url;
    } else {
      return 'No preview image available'; // Return null if no preview image is found
    }
};

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    
    const bookings = await Booking.findAll({
        where: { userId: currentUser },
      include: {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        
      },
    });

    if (!bookings.length) {
        return res.status(200).json({
            message: "No bookings yet"
        })
    }

    bookingsWithDetails = await Promise.all(
        bookings.map(async (booking) => {
            const spot = booking.Spot;
            const previewImage = await getPreviewImage(spot.id);

            return {
                ...booking.toJSON(),
                Spot: {
                    ...spot.toJSON(),
                    previewImage
                }
            }
            
        })
    )
    

    return res.status(200).json({ Bookings: bookingsWithDetails });
})



// Edit a Booking
router.put('/:id', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookingId = req.params.id;
    const {
        //spotId,
        //userId,
        startDate,
        endDate
    } = req.body;

    const booking = await Booking.findByPk(bookingId);
    const spot = booking.spotId;

    //check if owner of the booking
    if (booking.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    //error: Validation error 400
    if (!startDate || !endDate) {   //how to check if startDate is in the past? and if endDate is on or before startDate?
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                startDate: "startDate cannot be in the past",
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }
    //error: Couldn't find a Booking with the specified id 404 "Booking couldn't be found"
    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }
    //error: Can't edit a booking that's past the end date 403 "Past bookings can't be modified"
    const currentDate = new Date();
    if (booking.endDate < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }
    //error: booking conflict 403 "Sorry, this spot is already booked for the specified dates"
    const existingBooking = await Booking.findOne({
        //need more specific code to check for overlapping dates??
        where: {
            spotId: spot,
            startDate: startDate,
            endDate: endDate
        }
    });
    if (existingBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }

    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();
   

    return res.json({
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
    });
})


// Delete a Booking
router.delete('/:id', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const booking = await Booking.findByPk(req.params.id);

    //check if owner of the booking
    if (booking.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }


    //error: Couldn't find a Booking with the specified id
    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    //error: Can't delete a booking that's in the past 403 "Bookings that have been started can't be deleted"
    const currentDate = new Date();
    if (booking.startDate < currentDate) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy();
    return res.json({message: "Successfully deleted"});
})


module.exports = router;