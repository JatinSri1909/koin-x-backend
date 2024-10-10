const math = require("mathjs");
const Crypto = require("../models/cryptoModel");

const getDeviation = async (req, res) => {
  const coin = req.query.coin;
  if (!coin) return res.status(400).json({ error: "Coin is required" });

  const prices = await Crypto.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100)
    .select("price");
  if (prices.length === 0)
    return res
      .status(404)
      .json({ error: "Not enough data to calculate deviation" });

  const priceValues = prices.map((p) => p.price);
  const deviation = math.std(priceValues);

  res.json({ deviation: deviation.toFixed(2) });
};

module.exports = getDeviation;
