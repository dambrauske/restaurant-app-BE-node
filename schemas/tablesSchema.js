const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TablesSchema = new Schema({
  tableNo: {
    type: String,
    required: true,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
    },
  ],
  maxGuestCount: {
    type: Number,
    required: true,
  },
});

const Tables = mongoose.model("tables", TablesSchema);
module.exports = Tables;
