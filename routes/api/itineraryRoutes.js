const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all events
// ? should there be a JOIN ?
router.get('/', async (req, res) => {
    try {
        const itineraryData = await Itinerary.findAll({
            include: [{}]
        });
        res.status(200).json(itineraryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO GET a single event
// TODO finish JOIN
router.get('/:id', async (req, res) => {
    try {
        const itineraryData = await Itinerary.findByPk(req.params.id, {
            include: [{}]
        });
        if(!itineraryData) {
            res.status(400).json({ message: 'No itinerary found' });
            return;
        }
        res.status(200).json(itineraryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO Update an event

// TODO Create an event
router.post('/', async (req, res) => {
    try {
        const itineraryData = await Itinerary.create(req.body);
        res.status(200).json(itineraryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// TODO Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const itineraryData = await Itinerary.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!itineraryData) {
            res.status(404).json({ message: 'No itinerary found' });
        }
        res.status(200).json(itineraryData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;

