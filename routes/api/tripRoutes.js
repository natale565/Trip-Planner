const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all trips
// ? should there be a JOIN ?
router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            include: [{ model: User, attributes: ['username']}]
        });
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO GET a single trip
// TODO finish JOIN
router.get('/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [{ model: User, attributes : ['username']}]
        });
        if(!tripData) {
            res.status(400).json({ message: 'No trip found' });
            return;
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO Update a trip

// TODO CREATE a trip
router.post('/', async (req, res) => {
    try {
        const tripData = await Trip.create(req.body);
        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// TODO DELETE a trip
router.delete('/:id', async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!tripData) {
            res.status(404).json({ message: 'No trip found' });
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;