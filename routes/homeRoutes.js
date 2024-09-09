
const router = require('express').Router();
const { User, Trip, Flight, Lodging, Itinerary } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    } res.render('login');
});

router.get("/", (req, res) => {
    res.render('dashboard');
  });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    } res.render('login');
})

router.get('/signup', (req, res)=> {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login')
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            where: { user_id: req.session.user_id }, 
        });

        const trips = tripData.map((trip) => trip.get({ plain:true }));
        res.render('dashboard', {
            trips,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve trips', error: err.message});
    }
});

router.get('/trip', withAuth, (req, res) => {
    res.render('partials/start-trip', {
        logged_in: req.session.logged_in
    });
});

router.get('/trip/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [{model: User, as:'user', attributes: ['username'] }, { model: Flight }, { model: Lodging }, { model: Itinerary }]
        });

        const trip = tripData.get({ plain: true });

        res.render('tripDetails', {
            trip,
            flights: trip.flights || [],
            lodgings: trip.lodgings || [],
            itineraries: trip.itineraries || [],
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;