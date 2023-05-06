const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/todo.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Allowing API calls from cross-origin:
app.use(cors());

// Allowing express to read JSON data:
app.use(express.json());

// Sending Message that server is running:
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes:
app.use("/api/todo", routes);

// Conntectiong to mongodb:
mongoose
  .connect(`${process.env.URL}`)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB and running on PORT ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
