const router = require('express').Router();
const withAuth = require('../../utils/auth');
// TODO Import model
const { Itinerary, User } = require('../../models');
//  remember to export models as above


// TODO GET all events
router.get('/', withAuth, async (req, res) => {
    try {
        const itineraryData = await Itinerary.findAll({
            include: [{ model: User, attributes: ['username']}]
        });
        res.status(200).json(itineraryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO GET a single event
router.get('/:id', withAuth, async (req, res) => {
    try {
        const itineraryData = await Itinerary.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username']}]
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
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedItinerary = await Itinerary.update(
        {
            type: req.body.type,
            location: req.body.location,
            time: req.body.time,
            description: req.body.description,  
            user_id: req.body.user_id,
        },
        {
            where: {
                id: req.params.id,
            },
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

// TODO Create an event
router.post('/', withAuth, async (req, res) => {
    try {
        const itineraryData = await Itinerary.create(req.body);
        res.status(200).json(itineraryData);
    } catch (err) {
        res.status(400).json(err);
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

