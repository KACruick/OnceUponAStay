const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');

// Get all of the Current User's Bookings
router.get('/current/bookings', async (req, res) => { //is this the correct path?
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    });
    return res.json(bookings);
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', async (req,res) => {
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.id
        }
    });
    return res.json(bookings);
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:id', async (req, res) => {
    const {
        //spotId, ?? 
        //userId, ??
        startDate,
        endDate
    } = req.body;
    return res.json({message: "successfully created a new booking"});
})

// Edit a Booking
router.post('/:id', async (req, res) => {
    const {
        spotId,
        userId,
        startDate,
        endDate
    } = req.body;
    return res.json({message: "successfully edited a booking"});
})


// Delete a Booking
router.delete('/:id', async (req, res) => {
    const booking = await Booking.findByPk(req.params.id);
    await booking.destroy();
    return res.json({message: "successfully deleted a booking"});
})


module.exports = router;