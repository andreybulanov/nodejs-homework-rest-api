const router = require('express').Router();
const { auth } = require('../../middleware');
const { users: ctrl } = require('../../controllers');

router.get('/current', auth, ctrl.getCurrent);

module.exports = router;