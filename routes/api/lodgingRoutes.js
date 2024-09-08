const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Lodging } = require('../../models');

// CREATE a lodging
router.post('/', withAuth, async (req, res) => {
    try {
        const { lodging_name, lodging_location, check_in, check_out, trip_id } = req.body;
        if (!lodging_name || !lodging_location || !check_in || !check_out) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newLodging = await Lodging.create({
            lodging_name,
            lodging_location,
            check_in,
            check_out,
            user_id: req.session.user_id,
            trip_id,
        });
        res.status(200).json(newLodging);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create lodging', error: err.message });   
    }
}); 


// TODO GET all lodging
router.get('/', withAuth, async (req, res) => {
    try {
        const lodgingData = await Lodging.findAll({});
    if (lodgingData.length === 0) {
        return res.status(404).json({ message: 'No lodging found' });
    } 
    const lodgings = lodgingData.map(lodging => lodging.get({ plain: true }));
    res.render('tripDetails', {
        lodgings,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve lodgings', error: err.message });
    }
}); 

// TODO GET a single lodging
router.get('/:id', withAuth, async (req, res) => {
    try {
        const lodgingData = await Lodging.findOne({
            where: {
                id: req.params.id,
            },
        });
        if(!lodgingData) {
            return res.status(400).json({ message: 'No lodging found' });
        }
        res.json(lodgingData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve lodging', error: err.message });
    }
});

// TODO Update lodging
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedLodging = await Lodging.update(
        {
            lodging_name: req.body.lodging_name,
            lodging_location: req.body.lodging_location,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            user_id: req.session.user_id
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        }
    );
    if (updatedLodging[0]) {
        res.status(200).json({ message: 'Lodging updated succesfully '});
    } else {
        res.status(404).json({ message: 'Lodging not found or not authorized' });
    }
} catch (err) {
    res.status(500).json(err);
}
});

// TODO DELETE a lodging
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const lodgingData = await Lodging.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!lodgingData) {
            res.status(404).json({ message: 'No lodging found with this id' });
            return;
        }
        res.status(200).json({ message: 'Lodging deleted succesfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;