const express = require('express');
const router = express.Router();

const multer = require('multer');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// User
router.get('/users', auth, userCtrl.getAllUsers);
router.get('/users/:id', auth, userCtrl.getUser);

router.patch('/users/edit/:id', multer, auth, userCtrl.modifyUser);
router.delete('/users/delete/:id', auth, userCtrl.deleteUser);

module.exports = router;