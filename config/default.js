require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.SERVER_PORT,
  provider: 'wss://api-pub.bitfinex.com/ws/2',
  tips_limit: process.env.TIPS_LIMIT,
  currencies: ['tBTCUSD', 'tETHUSD'],
};
