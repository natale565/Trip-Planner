const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all lodging
// ? should there be a JOIN ?
router.get('/', async (req, res) => {
    try {
        const lodgingData = await Lodging.findAll({
            include: [{}]
        });
        res.status(200).json(lodgingData);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// TODO GET a single lodging
// TODO finish JOIN
router.get('/:id', async (req, res) => {
    try {
        const lodgingData = await Lodging.findByPk(req.params.id, {
            include: [{}]
        });
        if(!lodgingData) {
            res.status(400).json({ message: 'No lodging found' });
            return;
        }
        res.status(200).json(lodgingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO Update lodging 

// TODO CREATE a lodging
router.post('/', async (req, res) => {
    try {
        const lodgingData = await Lodging.create(req.body);
        res.status(200).json(lodgingData);
    } catch (err) {
        res.status(400).json(err);
    }
}); 

// TODO DELETE a lodging
router.delete('/:id', async (req, res) => {
    try {
        const lodgingData = await Lodging.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!lodgingData) {
            res.status(404).json({ message: 'No lodging found' });
        }
        res.status(200).json(lodgingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;