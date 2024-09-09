const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Itinerary } = require('../../models');

// TODO Create an event
router.post('/', withAuth, async (req, res) => {
    try {
        const { description, itinerary_location, itinerary_time, notes, trip_id } = req.body;
        if (!description || !itinerary_location || !itinerary_time || !notes) {
            return res.status(400).json({ message: 'All required fields must be provided' });
    }
    const newItinerary = await Itinerary.create({
        description,
        itinerary_location,
        itinerary_time,
        notes,
        user_id: req.session.user_id,
        trip_id,
    });

    res.status(200).json(newItinerary);
    } catch (err) {
res.status(400).json({ message: 'Failed to create itinerary', error: err.message });   
 }
});

// TODO GET all events
router.get('/', withAuth, async (req, res) => {
    try {
        const itineraryData = await Itinerary.findAll({});
    if (itineraryData.length === 0) {
        return res.status(404).json({ message: 'No itinerary found' });
    }
    const itineraries = itineraryData.map(itinerary => itinerary.get({ plain: true}));
    res.render('tripDetails', {
        itineraries,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve itineraries', error: err.message });

    }
});

// TODO GET a single event
router.get('/:id', withAuth, async (req, res) => {
    try {
        const itineraryData = await Itinerary.findOne({
            where: {
                id: req.params.id, 
            },
        });
        if(!itineraryData) {
            return res.status(400).json({ message: 'No itinerary found' });
        }
        res.json(itineraryData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve itineraries', error: err.message });
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Itinerary.update(
            {
                description: req.body.description,
                itinerary_location: req.body.itinerary_location,
                itinerary_time: req.body.itinerary_time,
                notes: req.body.notes,
                user_id: req.session.user_id
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                }
            }
        );

        }
    );

    if(!updatedItinerary[0]){
        res.status(404).json({ message: 'No itinerary found with this id '});
        return;
    }
    res.status(200).json({ message: 'Itinerary updated successfully '});
    } catch (err) {
    res.status(500).json(err);
    }
});

        if (affectedRows > 0) {
            res.status(200).json({ message: 'Itinerary updated successfully' });
        } else {
            res.status(404).json({ message: 'No itinerary found with this id' });
        }
    } catch (err) {
        console.error('Failed to update itinerary:', err);
        res.status(500).json({ message: 'Failed to update itinerary', error: err.message });
    }
});

// TODO Delete an event
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const itineraryData = await Itinerary.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!itineraryData) {
            res.status(404).json({ message: 'No itinerary found with this id' });
            return;
        }
        res.status(200).json({ message: 'No itinerary found with this id '});
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;

