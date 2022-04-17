const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");

// URL of the page we want to scrape
const url = "https://www.vauld.com/home";

function round(num, decimalPlaces = 5) {
  num = Math.round(num + "e" + decimalPlaces);
  return Number(num + "e" + -decimalPlaces);
}

const getStaking = async () => {
  try {
    //  browser = await puppeteer.launch();
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(url);
    let finalStakings = [];
    let firstItemCoinFromLatestArray = "";
    while (true) {
      const stakings = [];
      await page.waitFor(300);
      let data = await page.evaluate(
        () => document.querySelector("*").innerHTML
      );
      const $ = cheerio.load(data);
      let listItems = $(".coin-int-container");
      console.log("listItems", listItems);
      // Use .each method to loop through the li we selected
      listItems.each((idx, el) => {
        const coinRates = { exchange: "Vauld", duration: 30 };
        $(el)
          .find("div")
          .each((index, span) => {
            if (index === 1) {
              // coin
              coinRates.coin = $(span).text().trim();
            }
            if (index === 2) {
              // FLEX interestRate
              coinRates.interestRate = round(
                Number($(span).text().replace("%", "")) / 100
              );
            }
          });
        stakings.push(coinRates);
      });
      console.log("vauld stakings", stakings);
      try {
        await page.click(".right-button");
        await page.waitFor(300);
        await page.click(".right-button");
        await page.waitFor(300);
      } catch (error) {
        console.error("Error on vauld clicking!",error);
      }
      console.log("firstItemCoinFromLatestArray", firstItemCoinFromLatestArray);
      console.log("stakings[0].coin", stakings[0].coin);
      if (firstItemCoinFromLatestArray === stakings[0].coin) {
        break;
      } else {
        firstItemCoinFromLatestArray = stakings[0].coin;
      } 
      for (const staking of stakings) {
        const foundStaking = finalStakings.find((f) => f.coin === staking.coin);
        if (foundStaking) {
          continue;
        }
        finalStakings.push(staking);
      }
    }
    console.log("vauld finalStakings", finalStakings);
    return finalStakings;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = getStaking;
