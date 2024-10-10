const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchCrytoData = require("./jobs/job");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req,res,next) => {
    console.log(`HTTP METHOD: ${req.method} - URL: ${req.url}`);
    next();
});

fetchCrytoData();

app.use("/api", cryptoRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
