const express = require("express");
const router = express.Router();

const {
  addReservation,
  // getAvailableTimes,
  getRestaurantInfo,
  getTimesOnDate,
} = require("../controllers/mainController");

// router.get('/getTimes', getAvailableTimes);
router.get('/restaurant', getRestaurantInfo);
router.post('/addReservation', addReservation);
router.post('/getTimes', getTimesOnDate);

module.exports = router;
