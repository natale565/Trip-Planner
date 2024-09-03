const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all flights
// ? should there be a JOIN ?
router.get('/', async (req, res) => {
    try {
        const flightData = await Flight.findAll({
            include: [{}]
        });
        res.status(200).json(flightData);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// TODO GET a single flight
// TODO finish JOIN
router.get('/:id', async (req, res) => {
    try {
        const flightData = await Flight.findByPk(req.params.id, {
            include: [{}]
        });
        if(!flightData) {
            res.status(400).json({ message: 'No flight found' });
            return;
        }
        res.status(200).json(flightData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO Update a flight


// TODO CREATE a flight
router.post('/', async (req, res) => {
    try {
        const flightData = await Flight.create(req.body);
        res.status(200).json(flightData);
    } catch (err) {
        res.status(400).json(err);
    }
}); 

// TODO Delete a flight
router.delete('/:id', async (req, res) => {
    try {
        const flightData = await Flight.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!flightData) {
            res.status(404).json({ message: 'No flight found' });
        }
        res.status(200).json(flightData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;