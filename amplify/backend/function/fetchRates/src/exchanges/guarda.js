const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://guarda.com/staking/";

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
    const listItems = $(".column.is-half");
    const stakings = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
        const coin = $(el).find("p").text();
        const interestRateStr = $(el).find("span").text();
        if (interestRateStr.includes("Earn") && interestRateStr.includes("%")) {
          let interestRate;
          if (interestRateStr.includes("~")) {
            interestRate = round(Number(interestRateStr.split("~")[1].split("%")[0])/100);
          } else {
            interestRate = round(Number(interestRateStr.split("Earn")[1].trim().split("%")[0])/100);
          }
          stakings.push({
              coin,
              exchange: "Guarda",
              interestRate: interestRate
          });
        }
    });
    return stakings;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = getStaking;

