const { Types } = require("mongoose");
const { sendResponse } = require("../helperFunctions");
const { errorLogging } = require("../helperFunctions");
const reservationsDb = require("../schemas/reservationSchema");
const tablesDb = require("../schemas/tablesSchema");

const reservationDb = require("../schemas/reservationSchema");

const restaurant = {
  name: "El Restaurant",
  address: "23 Main St, Vilnius, Lithuania",
  phone: "+37000021001",
  description:
    "Here, ancient customs and future trends coexist, and the intricacies of culture blend seamlessly together over an Ethiopian-brewed coffee, or a bowl of Senegalese black-eyed pea stew. Inspired by our Co-Founder and Executive Chef Pierre Thiam’s mission to share culture through food, El Restaurant reflects the depth, richness, and vibrancy of culinary traditions in a modern, fast-casual setting.",
  menu: [
    {
      name: "appetizers",
      items: [
        {
          name: "Prawn salad",
          description:
            "Various salad, cucumber, avocado, cherry tomatoes, herb sauce, toast",
          price: 12.0,
        },
        {
          name: "Buratta salad",
          description: "Various salads, Burratta, mangoes, young beet leaves",
          price: 12.0,
        },
        {
          name: "Tuna tartare",
          description:
            'Marinated shallot, whole grain mustard, "Masago" caviar, parsley oil',
          price: 15.0,
        },
        {
          name: 'Baked "Camambert" cheese',
          description: "Cranberries, honey, hazelnuts, french toest",
          price: 14.0,
        },
      ],
    },
    {
      name: "main dishes",
      items: [
        {
          name: "Octopus",
          description:
            "Potato croquettes, celery cream, soybeans, onion sauce, herb butter",
          price: 25.0,
        },
        {
          name: "Duck marinated in orange",
          description:
            "Broccoli, cauliflower, sweet potatoes, marinated carrots, cherry sauce",
          price: 26.0,
        },
        {
          name: "Tuna tartare",
          description:
            'Marinated shallot, whole grain mustard, "Masago" caviar, parsley oil',
          price: 15.0,
        },
        {
          name: "Slow-roast pork ribs",
          description:
            "Bacon wrapped potatoes, champignons, caramelized cabbage, barbecue and horseradish sauce",
          price: 24.5,
        },
        {
          name: "Grilled avocado",
          description:
            "Tomatoes salsa, „Halloumi“ cheese (can be changed to vegan „Feta“ cheese)",
          price: 14.0,
        },
      ],
    },
    {
      name: "desserts",
      items: [
        {
          name: "Homemade ice cream",
          description: "Homemade vanilla ice cream with strawberries",
          price: 5.0,
        },
        {
          name: "Chocolate cake",
          description: "Chocolate cake with marzipan",
          price: 5.0,
        },
        {
          name: "Chocolate souffle",
          description:
            "Chocolate souffle with fresh berries and raspberry sorbet",
          price: 7.0,
        },
      ],
    },
    {
      name: "drinks",
      items: [
        {
          name: "Espresso",
          description: "",
          price: 2.5,
        },
        {
          name: "Latte",
          description: "",
          price: 3.0,
        },
        {
          name: "Capuccino",
          description: "",
          price: 3.0,
        },
        {
          name: "Black, fruit, green tea",
          description: "",
          price: 2.5,
        },
        {
          name: "Irish coffee with whiskey",
          description: "",
          price: 4.5,
        },
      ],
    },
  ],
};

const times = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

module.exports = {
  getTimesOnDate: async (req, res) => {
    const { date, guestsCount } = req.body;

    try {
      const tablesCollection = await tablesDb.find();

      const availableTimesAndTables = [];

      tablesCollection.forEach((table) => {
        if (table.maxGuestCount >= guestsCount) {
          // If there are no reservations, all times are available
          if (table.reservations.length === 0) {
            times.forEach((time) => {
              availableTimesAndTables.push({
                time,
                tableNo: table.tableNo,
                tableId: table._id,
              });
            });
            // If there are reservations: check the date and filter out busy times on that date
          } else {
            table.reservations.forEach((reservation) => {
              if (reservation.date === date) {
                const busyTime = reservation.time;
                const availableTimes = times.filter(
                  (time) => time !== busyTime
                );
                availableTimes.forEach((time) => {
                  availableTablesAndTimesArray.push({
                    time,
                    tableNo: table.tableNo,
                    tableId: table._id,
                  });
                });
              }
            });
            // Add remaining times for this table
            times.forEach((time) => {
              availableTimesAndTables.push({
                time,
                tableNo: table.tableNo,
                tableId: table._id,
              });
            });
          }
        }
      });

      console.log("availableTimesAndTables", availableTimesAndTables);

      sendResponse(res, false, "available times and tables", availableTimesAndTables);
    } catch (error) {
      console.log(error);
    }
  },

  getRestaurantInfo: async (req, res) => {
    console.log("get restaurant started");
    sendResponse(res, false, "Restaurant info", restaurant);
  },

  addReservation: async (req, res) => {
    const { date, time, tableNo, guestsCount, comment, name, phone } = req.body;

    try {
      const selectedTable = await tablesDb.findOne({ tableNo: tableNo });
      console.log("selectedTable", selectedTable);
      const selectedTableId = selectedTable._id;

      console.log("data", req.body);

      const newReservation = new reservationDb({
        _id: new Types.ObjectId(),
        date,
        time,
        tableId: selectedTableId,
        guestsCount,
        comment: comment,
        name,
        phone,
      });

      console.log("newReservation", newReservation);

      await newReservation.save();

      await tablesDb.findByIdAndUpdate(
        { _id: tableId },
        { $push: { reservations: newReservation._id } }
      );

      const reservations = await reservationDb.find();
      console.log(reservations);
      sendResponse(res, false, "Reservation saved", reservations);
    } catch (error) {
      console.log(error);
      sendResponse(res, true, "An error occured", null);
    }
  },

  getAvailableavailableTimes: async (req, res) => {
    const { date } = req.body;

    const reservationsOnDate = await reservationDb.find({ date: date });
    console.log("reservationsOnDate", reservationsOnDate);

    if (!reservationsOnDate) {
      sendResponse(res, false, "Available availableTimes", availableTimes);
    } else {
      console.log(reservationsOnDate);
      sendResponse(res, false, "Available availableTimes", availableTimes);
    }
  },
};
