const express = require("express");

const Crypto = require("../models/cryptoModel");

const CryptoRouter = express.Router();

CryptoRouter.get("/stats", (req, res) => {
  res.send("API for stats is working");
});

CryptoRouter.get("/deviation", (req, res) => {
  res.send("API for deviation is working");
});

module.exports = CryptoRouter;
