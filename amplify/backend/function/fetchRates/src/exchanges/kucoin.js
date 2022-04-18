const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");

// URL of the page we want to scrape
const url = "https://www.kucoin.com/earn";

function round(num, decimalPlaces = 5) {
  num = Math.round(num + "e" + decimalPlaces);
  return Number(num + "e" + -decimalPlaces);
}

const getStaking = async () => {
  try {
    console.log("Start Scraping Kucoin");
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(1500);
    const moreButton = '.MuiButtonBase-root.MuiButton-root.jss1.MuiButton-text.jss10.jss161.MuiButton-textPrimary.jss11.jss162';
    const sel = await page.waitForSelector(moreButton);
    try {
      await sel.click();
    } catch (error) {
      await page.waitFor(2000);  
      await sel.click();
    }
    let data = await page.evaluate(
      () => document.querySelector("*").innerHTML
    );
    const $ = cheerio.load(data);
    const listItems = $(".listItem___1bPdp");

    let stakings = [];
    listItems.each((idx, el) => {
      const children = $(el).children();
      if (children.length === 5) {
        const coin = $(children[0]).find(".currency___15qQn").text();
        const rateElement = $(children[1]).find(".dashedTooltip___3jnqA");
        const interestRate = round(
          Number(rateElement.text().replace("%", "")) / 100
        );
        const tenor = $(children[2]).text().toLowerCase().trim();
        let duration = undefined;
        if (tenor.includes("day")) {
          duration = parseInt(tenor.split("day")[0].trim());
        }
        const available = $(children[4]).text();
        const isAvailable = available.toLowerCase().trim() === "subscribe";
        if (isAvailable && tenor !== "fixed") {
          stakings.push({
            coin,
            interestRate,
            exchange: "Kucoin",
            duration
          });
        }
      }
    });
    return stakings;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = getStaking;
