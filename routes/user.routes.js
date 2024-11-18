const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.list);
router.get('/add', userController.showAddForm);
router.post('/add', userController.add);
router.get('/edit/:id', userController.showEditForm);
router.post('/edit/:id', userController.edit);
router.get('/delete/:id', userController.del);

module.exports = router;