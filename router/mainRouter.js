const express = require("express");
const router = express.Router();

const {
  addReservation,
  getAvailableTimes,
} = require("../controllers/mainController");

router.get('/getTimes', getAvailableTimes);
router.post('/addReservation', addReservation);

module.exports = router;
