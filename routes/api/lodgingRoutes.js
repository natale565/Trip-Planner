const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all lodging
// ? should there be a JOIN ?
router.get('/', async (req, res) => {
    try {
        const lodgingData = await Lodging.findAll({
            include: [{ model: User, attributes: ['username']}]
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
            include: [{ model: User, attributes : ['username']}]
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
router.put('/:id', (req, res) => {
    Lodging.update(
        {
            name: req.body.name,
            location: req.body.location,
            check_in: req.body.time,
            check_out: req.body.description,  
            user_id: req.body.user_id,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then((updatedLodging) => {
        res.json(updatedLodging);
    })
    .catch((err) => res.json(err));
});

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