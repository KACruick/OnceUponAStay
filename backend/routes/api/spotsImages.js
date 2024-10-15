const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");



module.exports = router;