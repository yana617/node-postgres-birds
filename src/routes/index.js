const router = require('express').Router();

const birds = require('./birds')

router.use('/birds', birds)

module.exports = router;
