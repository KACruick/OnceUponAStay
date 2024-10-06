const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');

// Get all of the Current User's Bookings
// Get all Bookings for a Spot based on the Spot's id
// Create a Booking from a Spot based on the Spot's id
// Edit a Booking
// Delete a Booking



module.exports = router;