const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Flight } = require('../../models');

// POST route to create a new flight
router.post('/', withAuth, async (req, res) => {
    try {
        const { airline, flight_number, from_airport, etd, to_airport, eta, trip_id } = req.body;

        if (!airline || !from_airport || !etd || !to_airport || !eta) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newFlight = await Flight.create({
            airline,
            flight_number,
            from_airport,
            etd,
            to_airport,
            eta,
            user_id: req.session.user_id,
            trip_id,
        });

        res.status(200).json(newFlight);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create flight', error: err.message });
    }
});

// TODO GET all flights
router.get('/', withAuth, async (req, res) => {
    try {
        const flightData = await Flight.findAll({});
    if (flightData.length === 0) {
        return res.status(404).json({ message: 'No flights found' });
    }
    const flights = flightData.map(flight => flight.get({ plain: true }));

    res.render('tripDetails', {
        flights,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json({ message: 'Failed to retrieve flights', error: err.message });

}
}); 

// TODO GET a single flight
router.get('/:id', withAuth, async (req, res) => {
    try {
        const flightData = await Flight.findOne({
            where: {
                id: req.params.id, 
            },
        });
        if(!flightData) {
            return res.status(400).json({ message: 'No flight found' });
        }
        res.json(flightData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve trip', error: err.message });
    }
});
 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedFlight = await Flight.update(
            {
                airline: req.body.airline,
                flight_number: req.body.flight_number,
                from_airport: req.body.from_airport,
                to_airport: req.body.to_airport,
                etd: req.body.etd,
                eta: req.body.eta,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        if (updatedFlight[0]) {
            res.status(200).json({ message: 'Flight updated successfully' });
        } else {
            res.status(404).json({ message: 'Flight not found or not authorized' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update flight', error: err.message });
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const flightId = req.params.id;

        if (!flightId) {
            return res.status(400).json({ message: 'Flight ID is required' });
        }

        const flight = await Flight.destroy({
            where: {
                id: flightId,
                user_id: req.session.user_id  
            },
        });

        if (flight) {
            res.status(200).json({ message: 'Flight deleted successfully' });
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }

    } catch (err) {
        console.error('Error deleting flight:', err); 
        res.status(500).json({ message: 'Failed to delete flight', error: err.message });
    }
});


module.exports = router;