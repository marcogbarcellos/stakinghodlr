const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://celsius.network/earn";

function round(num, decimalPlaces = 5) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

const getStaking = async () => {
  try {
    console.log("Start Scraping Celsius");
    // read url data HTML
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // get list items for all coins with interests
    // const listItems = $(".sc-hTtwUo.kuJEsr");
    // const listItems = $(".sc-hTtwUo");
    const main2 = $(".sc-kgUAyh.cEbECU");
    console.log("main2", main2);
    const main = $("#__next");
    const outerList1 = $(main).children(".sc-fEOsli");
    // console.log("outerList1", outerList1);
    const outerList2 = $(outerList1[0]).children(".sc-efBctP.gdQdU");
    // console.log("outerList2", outerList2);
    const outerList3 = $(outerList2[0]).children(".sc-iAvgwm.dnScnf");
    console.log("outerList3", outerList3);
    console.log("outerList3 children", outerList3[0].children);
    const listItems = $(outerList3[0]).children(".sc-BeQoi");
    console.log("listItems", listItems);
    const stakings = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      console.log("asa")
        const coin = $(el).children(".sc-gsnTZi.KtWJk").text();
        const interestRate = round(Number($(el).children(".sc-bBXxYQ.dEnYTE").text().replace("%", ""))/100);
        console.log(`#${idx+1} coin: ${coin}, interestRate: ${interestRate}`);
        stakings.push({
            coin,
            exchange: "Celsius",
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

getStaking();
