const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

//add validation functions? 

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    try {
    const bookings = await Booking.findAll({
        where: { userId: currentUser },
      include: {
        model: Spot, // Include the Spot model to get spot details
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
          "previewImage",
        ],
      },
    });
    return res.status(200).json({ Bookings: bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
router.delete('/:id', async (req, res) => {
    const booking = await Booking.findByPk(req.params.id);

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