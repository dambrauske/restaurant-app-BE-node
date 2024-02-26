const { Types } = require("mongoose");
const { sendResponse } = require('../helperFunctions');
const { errorLogging } = require("../helperFunctions");

const reservationDb = require(/schemas/ReservationSchema)

const times = ['11:00',
'11:30',
'11:30',
'12:00',
'12:30',
'13:00',
'13:30',
'14:00',
'14:30',
'15:00',
'15:30',
'16:00',
'16:30',
'17:00',
'17:30',
'18:00',
'18:30',
'19:00',
'19:30',
'20:00',]

module.exports = {

    addReservation: async (req, res) => {
        const { date, timeFrom, timeTo, guestCount, comment, name, phone } = req.body;

        console.log("data", req.body);

        const newReservation = new reservationDb({
            _id: new Types.ObjectId(),
            date,
            timeFrom,
            timeTo,
            guestCount,
            comment: comment | undefined,
            name,
            phone,
        })

        console.log("newReservation", newReservation);

        try {
            await newReservation.save();
            const reservations = await reservationDb.findAll();
            console.log(reservations);
            sendResponse(res, false, "Reservation saved", null)
        } catch (error) {
            errorLogging(error);
            sendResponse(res, true, "An error occured", null)
        }

    },

    getAvailableTimes: async (req, res) => {

        const { date } = req.body

        const reservationsOnDate = await reservationDb.find({ date: date })

        if (!reservationsOnDate) {
            sendResponse(res, false, "Available times", times)
        } else {
            console.log(reservationsOnDate);
            sendResponse(res, false, "Available times", times)
        }

    }

    
  
};