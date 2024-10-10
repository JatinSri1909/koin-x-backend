const Crypto = require("../models/cryptoModel");

const getStats = async (req, res) => {
  const coin = req.query.coin;
  if (!coin) return res.status(400).json({ error: "Coin is required" });

  const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestData) return res.status(404).json({ error: "No data found" });

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
};

module.exports = getStats;
