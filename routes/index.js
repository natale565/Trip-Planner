const router = require('express').Router();
const apiRoutes = require('./api');

// TODO Prefix all routes within api directory
router.use('/api', apiRoutes);

module.exports = router;

