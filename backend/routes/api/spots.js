const express = require('express')
const router = express.Router();

const { User, Spot, Image, Review, Booking } = require('../../db/models');

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json(spots);
})

// Get all Spots owned by the Current User
router.get('/current/spots', async (req, res) => { //is this the correct path? 
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });
    return res.json(spots);
})

// Get details of a Spot from an id
router.get('/:id', async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    return res.json(spot);
})

// Create a Spot
router.post('/', async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;
    return res.json({message: "successfully created a new spot"});
})

// Add an Image to a Spot based on the Spot's id


// Edit a Spot
router.post('/:id', async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;
    return res.json({message: "successfully updated the spot"});
})

// Delete a Spot
router.delete('/:id', async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    await spot.destroy();
    return res.json({message: "successfully deleted the spot"});
})

//Add Query Filters to Get All Spots


// Delete a Spot Image


module.exports = router;