const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../models/cryptoModel');

const fetchCrytoData = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}` , {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,matic-network'
            }
        });

        const cryptos = response.data;
        for(let crypto of cryptos) {
            const newEntry = new Crypto({
                coin: crypto.id,
                price: crypto.current_price,
                marketCap: crypto.market_cap,
                change24h: crypto.price_change_percentage_24h
            });
            await newEntry.save();
        }

    } catch (error) {
        console.log(error);
    }
};

cron.schedule('0 */2 * * *', fetchCrytoData);

module.exports = fetchCrytoData;