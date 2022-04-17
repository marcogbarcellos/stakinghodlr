const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://crypto.com/br/earn";
const urlCoinMarketCap = "https://coinmarketcap.com/currencies/";

function round(num, decimalPlaces = 5) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

const getStaking = async () => {
  try {
    // read url data HTML
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // get list items for all coins with interests
    const listItems = $(".css-11bys66");
    // Use .each method to loop through the li we selected
    const stakings = (await Promise.all(listItems.map( async (idx, el) => {
        const coin = $(el).children(".css-1vy5ygx").text().replace(" ", "-").toLowerCase();
        try {
          const { data: dataMarketCap } = await axios.get(`${urlCoinMarketCap}${coin}`);
          const $$ = cheerio.load(dataMarketCap);
          const coinSymbol = $$(".nameSymbol").text();
          const interestRate = round(Number($(el).children(".css-1demv8w").text().replace("%", ""))/100);
          // console.log(`#${idx+1} coin: ${coin}, coinSymbol: ${coinSymbol}, interestRate: ${interestRate}`);
          return {
              coin: coinSymbol,
              exchange: "Crypto.com",
              interestRate: interestRate
          };
        } catch (error) {
          console.error("Coinmarketcap error", error);
          return null;
        }
    }))).filter(e => e !== null);
    return stakings;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = getStaking;

