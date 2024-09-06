const router = require('express').Router();
const withAuth = require('../../utils/auth');
// TODO Import model
const { Lodging, User } = require('../../models');
//  remember to export models as above


// TODO GET all lodging
router.get('/', withAuth, async (req, res) => {
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
router.get('/:id', withAuth, async (req, res) => {
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
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedLodging = await Lodging.update(
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
    );
    if (updatedLodging[0]) {
        res.status(404).json({ message: 'No lodging found with this id' });
        return;
    }
    res.status(200).json({ message: 'Lodging updated succesfully '});
} catch (err) {
    res.status(500).json(err);
}
});

// TODO CREATE a lodging
router.post('/', withAuth, async (req, res) => {
    try {
        const lodgingData = await Lodging.create(req.body);
        res.status(200).json(lodgingData);
    } catch (err) {
        res.status(400).json(err);
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