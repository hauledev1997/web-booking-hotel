const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const hotelController = require('../controllers/hotel');

// user
router.post('/admin/login', adminController.postAdminLogin);

router.get('/admin/users', adminController.getUsersByAdmin);

// // transaction
router.get('/admin/latest-transactions', adminController.getLatestTransactions);

router.get('/admin/transactions', adminController.getTransactions);

// hotel
router.get('/admin/hotels', adminController.getHotels);

router.post('/admin/add-hotel', adminController.postHotel);

router.post('/admin/delete-hotel', adminController.postDeleteHotel);

// room
router.get('/admin/rooms', adminController.getRooms);

router.post('/admin/add-room', adminController.postRoom);

router.post('/admin/delete-room', adminController.postDeleteRoom);

// edit

// router.get('/admin/edit-hotel/:hotelId', adminController.getEditHotel);

// router.post('/admin/edit-hotel/:hotelId', adminController.postEditHotel);

// router.get('/admin/edit-room/:roomId', adminController.getEditRoom);

// router.post('/admin/edit-room/:roomId', adminController.postEditRoom);

module.exports = router;
