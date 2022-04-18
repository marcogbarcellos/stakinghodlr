const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");

/******* MISSING ITERATING OVER all possible staking duration terms (currently just get the "active" one) ********/

// URL of the page we want to scrape
const url = "https://www.huobi.com/en-us/financial/earn?type=steady";

function round(num, decimalPlaces = 5) {
  num = Math.round(num + "e" + decimalPlaces);
  return Number(num + "e" + -decimalPlaces);
}

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}

const getPartialStakings = async page => {
  let data = await page.evaluate(
    () => document.querySelector("*").innerHTML
  );
  const $ = cheerio.load(data);
  const listItems = $(".el-table__row");

  let stakings = [];
  listItems.each((idx, el) => {
    const children = $(el).children();
    if (children.length === 5) {
      const coin = $(children[0]).find(".coin-name").text().trim();
      const rateElement = $(children[1]).find(".rate-item");
      const interestRate = round(
        Number(rateElement.text().replace("%", "")) / 100
      );
      const tenor = $(children[2]).find(".active").text();
      // const tenor = $(children[2]).find("active").text().toLowerCase().trim();
      let duration = undefined;
      if (tenor.includes("days")) {
        duration = parseInt(tenor.split("day")[0].trim());
      }
      
      stakings.push({
        coin,
        interestRate,
        exchange: "Huobi",
        duration
      });
      
    }
  });
  return stakings;
}

const getStaking = async () => {
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(1000);
    await autoScroll(page);
    await page.waitFor(1000);
    return getPartialStakings(page);
    
    
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = getStaking;
