const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },

    guestsCount: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Tables',
    }

})

const Reservation = mongoose.model('restaurant', ReservationSchema)
module.exports = Reservation