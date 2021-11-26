const router = require('express').Router();
const tracks = require('./tracks');

router.use('/tracks', tracks);

module.exports = router;
