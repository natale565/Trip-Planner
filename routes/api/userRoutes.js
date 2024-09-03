const router = require('express').Router();

// TODO Import model
const { Flight, Itinerary, Lodging, Trip, User } = require('../../models');
//  remember to export models as above

// TODO GET all users
// ? should there be a JOIN ?
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{}]    
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO GET a single user
// TODO finish JOIN
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{}]
        });
        if(!userData) {
            res.status(400).json({ message: 'No user found' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// TODO Update an event

// TODO CREATE a user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// TODO DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
