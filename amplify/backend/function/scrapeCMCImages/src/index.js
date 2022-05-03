const cheerio = require("cheerio");
const chromium = require("chrome-aws-lambda");
const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const listCoins = gql`
  query ListCoins($filter: ModelCoinFilterInput, $nextToken: String) {
    listCoins(nextToken: $nextToken, filter: $filter) {
      items {
        symbol
        name
        logoUrl
      }
      nextToken
    }
  }
`;

const updateCoin = gql`
  mutation UpdateCoin(
    $input: UpdateCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    updateCoin(input: $input, condition: $condition) {
      symbol
      name
      logoUrl
      type
      platform
      categories
      createdAt
      updatedAt
    }
  }
`;

const getAllCoins = async () => {
  try {
    let nextToken;
    let items = [];
    do {
      const graphqlData = await axios({
        url: process.env.API_STAKINGHODLR_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_STAKINGHODLR_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(listCoins),
          variables: {
            filter: {
              logoUrl: {attributeExists: false},
            },
            nextToken,
          },
        },
      });
      items = graphqlData.data.data.listCoins.items
        ? [...items, ...graphqlData.data.data.listCoins.items]
        : items;
      nextToken = graphqlData.data.data.listCoins.nextToken;
    } while (nextToken);

    return items;
  } catch (err) {
    console.error("error posting to appsync: ", err);
  }
};

const updateCoins = async (coins) => {
  if (coins.length > 0) {
    for (const coin of coins) {
      try {
        await axios({
          url: process.env.API_STAKINGHODLR_GRAPHQLAPIENDPOINTOUTPUT,
          method: "post",
          headers: {
            "x-api-key": process.env.API_STAKINGHODLR_GRAPHQLAPIKEYOUTPUT,
          },
          data: {
            query: print(updateCoin),
            variables: {
              input: { ...coin },
            },
          },
        });
        
      } catch (error) {
        console.error("Inserting coin failed", error);
      }
    }
    console.log("Inserted coins successfully");
  } else {
    console.log("No Coins to insert, all of them were already found");
  }
};


async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

const getPartialStakings = async (page) => {
  let data = await page.evaluate(() => document.querySelector("*").innerHTML);
  const $ = cheerio.load(data);
  const listItems = $(".cmc-table tbody tr");

  // console.log('listItems', listItems);
  const coinImages = [];
  // Use .each method to loop through the li we selected
  listItems.each((idx, el) => {
    const logoUrl = $(el).find("img").attr("src");
    const coinSymbolNode = $(el).find(".sc-1eb5slv-0.kZlTnE");
    const coinSymbolHtml = coinSymbolNode.html();
    if (coinSymbolHtml) {
      const coinSymbol = coinSymbolHtml.split(" ")[1];
      console.log("coinSymbol", coinSymbol);
      coinImages.push({ logoUrl, coinSymbol });
    }
  });
  return coinImages;
};

// Async function which scrapes the data
async function getCoinMarketCapImages(numberOfCMCPages) {
  try {
    console.log("Start Scraping CMC");
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let url = "https://coinmarketcap.com/";
    let coinImages = [];
    for (let index = 1; index <= numberOfCMCPages; index++) {
      if (index > 1) {
        url = `https://coinmarketcap.com/?page=${index}`;
      }
      await page.goto(url);
      await page.waitFor(1500);
      await autoScroll(page);
      await page.waitFor(1500);
      const newCoinImages = await getPartialStakings(page);
      coinImages = [...coinImages, ...newCoinImages];
    }
    console.log("ALLLL CON IMAGES:", JSON.stringify(coinImages, null, 2));
    return coinImages;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const coinmarketcapImages = await getCoinMarketCapImages(event.numberOfCMCPages || 3);
  console.log(`coinmarketcapImages: ${JSON.stringify(coinmarketcapImages, null, 2)}`);
  const coins = await getAllCoins();
  const updatingCoins = [];
  for (const coin of coins) {
    if (!coin.logoUrl) {
      const foundCMCImage = coinmarketcapImages.find(
        (c) => c.coinSymbol === coin.symbol
      );
      if (foundCMCImage) {
        console.log(`FOUND logo for coin ${coin.symbol}`);
        updatingCoins.push({
          symbol: coin.symbol,
          logoUrl: foundCMCImage.logoUrl,
        });
      }
    }
  }
  console.log("updating Coins ", JSON.stringify(updatingCoins, null, 2));
  await updateCoins(updatingCoins);
  return updatingCoins;
};
