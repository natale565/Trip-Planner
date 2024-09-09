const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Trip, User, Flight, Itinerary, Lodging } = require('../../models');


// TODO CREATE a trip
router.post('/', withAuth, async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            return res.status(400).json({ message: 'Location is required' });
        }
        const tripData = await Trip.create({
            location,
            user_id: req.session.user_id,
        });

        res.status(200).json(tripData);
    } catch (err) {
        console.error('Failed to create trip:', err);
        res.status(500).json({ message: 'Failed to create trip', error: err.message });
    }
});


// Get All Trips
router.get('/', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Flight,
                    attributes: ['airline', 'flight_number', 'from_airport', 'etd', 'to_airport', 'eta']
                },
                {
                    model: Lodging,
                    attributes: ['lodging_name', 'lodging_location', 'check_in', 'check_out']
                },
                {
                    model: Itinerary,
                    attributes: ['description', 'itinerary_location', 'itinerary_time', 'notes']
                }
            ]
        });

        if (tripData.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        const trips = tripData.map(trip => trip.get({ plain: true }));

        res.render('home', {
            trips,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve trips', error: err.message });
    }
});

// TODO DELETE a trip
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const tripId = req.params.id;
        const trip = await Trip.destroy({
            where: {
                id: tripId,
                user_id: req.session.user_id
            },
        });
        if (trip) {
            res.status(200).json({ message: 'Trip deleted successfully' });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete trip', error: err.message });
    }
});

module.exports = router;