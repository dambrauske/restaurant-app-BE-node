const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/mainRouter");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  ?.connect(process.env.DB_KEY)
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.error("error", e);
  });

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/", router);

const port = 8000;

app.listen(port, () => {
  console.log("Express app running at http://localhost:" + port);
});
