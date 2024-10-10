const express = require("express");

const getStats = require("../controllers/stats");
const getDeviation = require("../controllers/deviation");

const CryptoRouter = express.Router();

CryptoRouter.get("/stats", getStats);

CryptoRouter.get("/deviations", getDeviation);

module.exports = CryptoRouter;
