const express = require('express');

const hotelController = require('../controllers/hotel');

const router = express.Router();

router.get('/hotel', hotelController.getHotel);
router.get('/hotel/:id', hotelController.getDetailHotel);
router.post('/search', hotelController.postSearch);
router.post('/room', hotelController.postRoom);
// router.post('/nameHotel', hotelController.postHotelFromId);

module.exports = router;
