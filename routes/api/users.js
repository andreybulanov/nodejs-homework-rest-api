const router = require('express').Router();
const { auth, upload } = require('../../middleware');
const { users: ctrl } = require('../../controllers');

router.get('/current', auth, ctrl.getCurrent);
router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);
router.get('/verify/:verificationToken', ctrl.veryfyEmail);
router.post('/verify', ctrl.reSendEmail);

module.exports = router;