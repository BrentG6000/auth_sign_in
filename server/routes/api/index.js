// Creates a router object to handle requests
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);

module.exports = router;