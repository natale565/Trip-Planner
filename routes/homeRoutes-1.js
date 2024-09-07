const router = require('express').Router();
const { Trip } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll();
        const trips = tripData.map((trip) => trip.get({ plain: true }))

        res.render('home',  {
            trips,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve trips', error: err.message });
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    } res.render('login');
});

router.get('/home', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            where: { user_id: req.session.user_id }, 
        });

        const trips = tripData.map((trip) => trip.get({ plain:true }));
        res.render('home', {
            trips,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve trips', error: err.message});
    }
});

router.get('/home/new', withAuth, (req, res) => {
    res.render('trip', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;