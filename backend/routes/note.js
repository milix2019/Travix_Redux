const router = require('express').Router();
const noteCtrl = require('../controllers/note');
const validator = require('../validators/note')

router.post('/',    validator.create,   noteCtrl.create);
router.get('/',     validator.readAll,  noteCtrl.readAll);
router.get('/:id',  validator.readOne,  noteCtrl.readOne);
router.put('/:id',  validator.update,   noteCtrl.update);
router.delete('/:id',  validator.delete,   noteCtrl.delete);

module.exports = router;
