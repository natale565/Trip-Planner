const router = require('express').Router();
const flightRoutes = require('./flightRoutes');
const itineraryRoutes = require('./itineraryRoutes');
const lodgingRoutes = require('./lodgingRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');

router.use('/flight', flightRoutes);
router.use('/itinerary', itineraryRoutes);
router.use('/lodging', lodgingRoutes);
router.use('/trip', tripRoutes);
router.use('/user', userRoutes);

module.exports = router;