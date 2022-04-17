const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://nexo.io/earn-crypto";

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
    const grid = $(".grid.grid-cols-2");
    const mainTable = grid[0];
    const mainTableChildren = $(mainTable).children();
    const stakings = [];
    // Use .each method to loop through the li we selected
    mainTableChildren
      .each((idx, el) => {
        const coinInterestArray = $(el)
          .children(".flex.items-center")
          .text()
          .split("Earn")
          .map((o) => o.trim());
        const coin = coinInterestArray[1].split(" Interest")[0];
        const insterestRateText = coinInterestArray[0].split("%")[0].trim();
        const interestRate = round(Number(insterestRateText) / 100);
        stakings.push({
          coin,
          exchange: "Nexo",
          interestRate,
        });
      });
    return stakings || [];
  } catch (err) {
    console.error("ERROR scraping Youhodler", err);
    return [];
  }
};

module.exports = getStaking;