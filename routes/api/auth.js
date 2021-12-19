const router = require('express').Router();
const { auth, validation } = require('../../middleware/index');
const { auth: ctrl } = require('../../controllers');
const { joiUserSchema, joiLoginSchema } = require('../../models/user');

router.post('/register',validation(joiUserSchema), ctrl.register);
router.post('/login', validation(joiLoginSchema), ctrl.login);
router.get('/logout', auth, ctrl.logout);

module.exports = router;