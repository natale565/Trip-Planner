const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all flights
router.get('/', async (req, res) => {
    try {
        const flightData = await Flight.findAll({
            include: [{ model: User, attributes : ['username']}],
        });
        res.status(200).json(flightData);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// TODO GET a single flight
router.get('/:id', async (req, res) => {
    try {
        const flightData = await Flight.findByPk(req.params.id, {
            include: [{ model: User, attributes : ['username']}]
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
router.put('/:id', (req, res) => {
    Flight.update(
        {
            airline: req.body.airline,
            from_airport: req.body.from_airport,
            to_airport: req.body.to_airport,
            etd: req.body.etd,
            eta: req.body.eta,
            user_id: req.body.user_id,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then((updatedFlight) => {
        res.json(updatedFlight);
    })
    .catch((err) => res.json(err));
});

//CREATE a flight
router.post('/', async (req, res) => {
    try {
        const flightData = await Flight.create(req.body);
        res.status(200).json(flightData);
    } catch (err) {
        res.status(400).json(err);
    }
}); 

//Delete a flight
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