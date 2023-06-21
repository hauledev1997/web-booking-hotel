const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/reservation', userController.postReservation);
router.post('/transactions', userController.postTransaction);

module.exports = router;
