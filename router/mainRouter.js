const express = require("express");
const router = express.Router();

const {
  addReservation,
  getAvailableTimes,
  getRestaurantInfo,
} = require("../controllers/mainController");

router.get('/getTimes', getAvailableTimes);
router.get('/restaurant', getRestaurantInfo);
router.post('/addReservation', addReservation);

module.exports = router;
