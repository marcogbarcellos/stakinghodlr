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
    // console.log("Start Scraping Nexo");
    // read url data HTML
    console.log(`scraping nexo url ${url}`);
    const { data } = await axios.get(url);
    console.log("data", data);
    const $ = cheerio.load(data);
    // get list items for all coins with interests
    const grid = $(".grid.grid-cols-2");
    console.log("grid length", grid.length);
    const mainTable = grid[0];
    console.log("mainTable", mainTable);
    const mainTableChildren = $(mainTable).children();
    console.log("mainTableChildren length", mainTableChildren.length);
    const stakings = [];
    // Use .each method to loop through the li we selected
    mainTableChildren
      .each((idx, el) => {
        console.log("el idx", idx);
        const coinInterestArray = $(el)
          .children(".flex.items-center")
          .text()
          .split("Earn")
          .map((o) => o.trim());
        const coin = coinInterestArray[1].split(" Interest")[0];
        const insterestRateText = coinInterestArray[0].split("%")[0].trim();
        const interestRate = round(Number(insterestRateText) / 100);
        console.log(`NEXO #${idx + 1} coin: ${coin}, interestRate: ${interestRate}`);
        stakings.push({
          coin,
          exchange: "Nexo",
          interestRate,
        });
      });
    console.log('stakings', stakings);
    return stakings || [];
  } catch (err) {
    console.error("ERROR scraping Youhodler", err);
    return [];
  }
};

module.exports = getStaking;