const { Types } = require("mongoose");
const { sendResponse } = require("../helperFunctions");
const { errorLogging } = require("../helperFunctions");

const reservationDb = require("../schemas/reservationSchema");

const times = [
  "11:00",
  "11:30",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

const tables = [
  {
    tableNo: 1,
    times: {
      "11:00": "available",
      "11:30": "available",
      "11:30": "available",
      "12:00": "available",
      "12:30": "available",
      "13:00": "available",
      "13:30": "available",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "available",
      "16:30": "available",
      "17:00": "available",
      "17:30": "available",
      "18:00": "available",
      "18:30": "available",
      "19:00": "available",
      "19:30": "available",
      "20:00": "available",
    },
    maxGuestCount: 6,
  },
  {
    tableNo: 2,
    times: {
      "11:00": "available",
      "11:30": "available",
      "11:30": "available",
      "12:00": "available",
      "12:30": "available",
      "13:00": "available",
      "13:30": "available",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "available",
      "16:30": "available",
      "17:00": "available",
      "17:30": "available",
      "18:00": "available",
      "18:30": "available",
      "19:00": "available",
      "19:30": "available",
      "20:00": "available",
    },
    maxGuestCount: 6,
  },
  {
    tableNo: 3,
    times: {
      "11:00": "available",
      "11:30": "available",
      "11:30": "available",
      "12:00": "available",
      "12:30": "available",
      "13:00": "available",
      "13:30": "available",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "available",
      "16:30": "available",
      "17:00": "available",
      "17:30": "available",
      "18:00": "available",
      "18:30": "available",
      "19:00": "available",
      "19:30": "available",
      "20:00": "available",
    },
    maxGuestCount: 4,
  },
  {
    tableNo: 4,
    times: {
      "11:00": "available",
      "11:30": "available",
      "11:30": "available",
      "12:00": "available",
      "12:30": "available",
      "13:00": "available",
      "13:30": "available",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "available",
      "16:30": "available",
      "17:00": "available",
      "17:30": "available",
      "18:00": "available",
      "18:30": "available",
      "19:00": "available",
      "19:30": "available",
      "20:00": "available",
    },
    maxGuestCount: 4,
  },
  {
    tableNo: 5,
    times: {
      "11:00": "available",
      "11:30": "available",
      "11:30": "available",
      "12:00": "available",
      "12:30": "available",
      "13:00": "available",
      "13:30": "available",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "available",
      "16:30": "available",
      "17:00": "available",
      "17:30": "available",
      "18:00": "available",
      "18:30": "available",
      "19:00": "available",
      "19:30": "available",
      "20:00": "available",
    },
    maxGuestCount: 2,
  },
  {
    tableNo: 6,
    times: {
      "11:00": "available",
      "11:30": "available",
      "11:30": "available",
      "12:00": "available",
      "12:30": "available",
      "13:00": "available",
      "13:30": "available",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "available",
      "16:30": "available",
      "17:00": "available",
      "17:30": "available",
      "18:00": "available",
      "18:30": "available",
      "19:00": "available",
      "19:30": "available",
      "20:00": "available",
    },
    maxGuestCount: 2,
  },
];

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

module.exports = {
  getRestaurantInfo: async (req, res) => {
    sendResponse(res, false, "Restaurant info", restaurant);
  },

  addReservation: async (req, res) => {
    const { date, time, guestsCount, comment, name, phone } = req.body;

    console.log("data", req.body);

    const newReservation = new reservationDb({
      _id: new Types.ObjectId(),
      date,
      time,
      guestsCount,
      comment: comment,
      name,
      phone,
    });

    console.log("newReservation", newReservation);

    try {
      await newReservation.save();
      const reservations = await reservationDb.find();
      console.log(reservations);
      sendResponse(res, false, "Reservation saved", reservations);
    } catch (error) {
      errorLogging(error);
      sendResponse(res, true, "An error occured", null);
    }
  },

  getAvailableTimes: async (req, res) => {
    const { date } = req.body;

    const reservationsOnDate = await reservationDb.find({ date: date });

    if (!reservationsOnDate) {
      sendResponse(res, false, "Available times", times);
    } else {
      console.log(reservationsOnDate);
      sendResponse(res, false, "Available times", times);
    }
  },
};
