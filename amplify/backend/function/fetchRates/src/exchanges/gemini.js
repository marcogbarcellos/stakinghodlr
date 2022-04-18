const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://www.gemini.com/earn";

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
    const listItems = $(".style__InterestRate-sc-1e02s9q-1");
    const stakings = [];
    listItems.each((idx, el) => {
        const coin = $(el).find(".HoverUnderline__AnimatedUnderline-sc-ppfj1p-1").text();
        const rateStr = $(el).find(".Typography__Text-sc-xlbr2l-0").text().split(coin)[1].replace("%", "");
        const interestRate = round(Number(rateStr)/100);
        stakings.push({
            coin,
            exchange: "Gemini",
            interestRate: interestRate
        });
    });
    return stakings;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = getStaking;

