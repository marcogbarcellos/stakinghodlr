const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://www.youhodler.com/earn-crypto";

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
    const listItems = $(".nav-drop-a.tile-inpage.w-inline-block.w-clearfix");
    const stakings = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
        const coin = $(el).children(".nav-drop-a-tile-coin-ticker").text();
        const interestRate = round(Number($(el).children(".interest-regular").text().replace("%", ""))/100);
        stakings.push({
            coin,
            exchange: "Youhodler",
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

