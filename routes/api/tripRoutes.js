const router = require('express').Router();
const withAuth = require('../../utils/auth');

// TODO Import model
const { Trip, User } = require('../../models');
//  remember to export models as above


// TODO GET all trips
router.get('/', withAuth, async (req, res) => {
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
router.get('/:id', withAuth, async (req, res) => {
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
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedTrip = await Trip.update(
            {
                name: req.body.name,
                location: req.body.location,
                user_id: req.body.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!updatedTrip[0]) {
            res.status(404).json({ message: 'No trip found with this id' });
            return;
        }

        res.status(200).json({ message: 'Trip updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});


// TODO CREATE a trip
router.post('/', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.create(req.body);
        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// TODO DELETE a trip
// Delete a trip
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!tripData) {
            res.status(404).json({ message: 'No trip found with this id' });
            return;
        }

        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;