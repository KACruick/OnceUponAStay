const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');

// Get all Reviews of the Current User

// Get all Reviews by a Spot's id
// Create a Review for a Spot based on the Spot's id
// Add an Image to a Review based on the Review's id
// Edit a Review
// Delete a Review

// Delete a Review Image


module.exports = router;