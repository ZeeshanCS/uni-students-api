const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routers
const studentsRoute = require("./routes/students");

app.use(`/students`, studentsRoute);

// Database Connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => {
    console.log(err);
  });

// Running server
app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
