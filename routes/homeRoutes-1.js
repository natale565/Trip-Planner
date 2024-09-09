const router = require('express').Router();
const { User, Trip, Flight, Lodging, Itinerary } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('home');
        return;
    } res.render('login');
});

router.get("/", (req, res) => {
    res.render("home");
  });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('home');
        return;
    } res.render('login');
})

router.get('/signup', (req, res)=> {
    if (req.sessiosn.logged_in) {
        res.redirect('home');
        return;
    }
    res.render('login')
})

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


router.get('/trip', withAuth, (req, res) => {
    res.render('trip', {
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

router.get('/home/new', withAuth, (req, res) => {
    res.render('trip', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;