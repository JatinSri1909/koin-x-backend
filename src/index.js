const express = require("express");
const dotenv = require("dotenv");

const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchCrytoData = require("./jobs/job");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Fetch crypto data
fetchCrytoData();

// Routes
app.use("/", cryptoRoutes);


app.listen(port, () => {
  console.log(`Server is running ....`);
});
