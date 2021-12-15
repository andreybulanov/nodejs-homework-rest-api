const router = require('express').Router();

const { contacts: ctrl } = require('../../controllers/index');
const { joiContactsSchema, favoriteSchema } = require('../../models/contact');
const { validation } = require('../../middleware/index');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getId);

router.post('/', validation(joiContactsSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validation(joiContactsSchema), ctrl.updateById);

router.patch('/:contactId/favorite', validation(favoriteSchema), ctrl.updateFavorite);

module.exports = router;  
