const AWS = require("aws-sdk");
const { TwitterClient } = require("twitter-api-client");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const listCoinRates = gql`
  query ListCoinRates($nextToken: String) {
    listCoinRates(nextToken: $nextToken) {
      items {
        coinNameExchangeName
        date
        coinSymbol
        exchangeName
        exchange {
          twitterAccount
        }
        coin {
          categories
        }
        interestRate
        lockDays
        origin
      }
      nextToken
    }
  }
`;

const numerals = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th" };

const getAllCoinRates = async () => {
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
          query: print(listCoinRates),
          variables: {
            nextToken,
          },
        },
      });
      items = graphqlData.data.data.listCoinRates.items
        ? [...items, ...graphqlData.data.data.listCoinRates.items]
        : items;
      nextToken = graphqlData.data.data.listCoinRates.nextToken;
    } while (nextToken);

    return items.sort((a, b) => b.interestRate - a.interestRate);
  } catch (err) {
    console.error("error posting to appsync: ", err);
  }
};

const tweetRates = async (tweet) => {
  const { Parameters } = await new AWS.SSM()
    .getParameters({
      Names: [
        "TWITTER_API_KEY",
        "TWITTER_API_SECRET",
        "TWITTER_ACCESS_TOKEN",
        "TWITTER_ACCESS_TOKEN_SECRET",
        "TWITTER_BEARER_TOKEN",
      ].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
  const apiKey = Parameters.find((p) =>
    p.Name.includes("TWITTER_API_KEY")
  ).Value;
  const apiSecret = Parameters.find((p) =>
    p.Name.includes("TWITTER_API_SECRET")
  ).Value;
  const accessToken = Parameters.find((p) =>
    p.Name.includes("TWITTER_ACCESS_TOKEN")
  ).Value;
  const accessTokenSecret = Parameters.find((p) =>
    p.Name.includes("TWITTER_ACCESS_TOKEN_SECRET")
  ).Value;
  // const bearerToken = Parameters.find((p) =>
  //   p.Name.includes("TWITTER_BEARER_TOKEN")
  // ).Value;
  try {
    const twitterClient = new TwitterClient({
      apiKey,
      apiSecret,
      accessToken,
      accessTokenSecret,
    });
    const tweetResult = await twitterClient.tweets.statusesUpdate({
      status: tweet,
    });
    console.log("tweetResult:", tweetResult);
  } catch (error) {
    console.error("tweeting ERROR:", error);
  }
};

const getTopCoinRates = (coinRates, returnNumber, coinSymbol) => {
  if (coinSymbol) {
    coinRates = coinRates.filter((c) => c.coinSymbol === coinSymbol);
  }
  coinRates.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
  return coinRates.slice(0, returnNumber);
};

const getTweetPhraseForAllCoinsRates = (
  coinRates,
  coinSymbols,
  numberOfRates
) => {
  let topRatesPhrase = `Some of the best #staking APYs today:\n\n`;
  if (coinSymbols && coinSymbols.length > 0) {
    for (coinSymbol of coinSymbols) {
      const coinRate = coinRates.find((rate) => rate.coinSymbol === coinSymbol);
      topRatesPhrase += `#${coinRate.coinSymbol} up to ${(
        coinRate.interestRate * 100
      ).toFixed(2)}% at #${coinRate.exchangeName}\n`;
    }
  } else {
    topRatesPhrase = `The best #staking APYs today:\n\n`;
    for (const coinRate of getTopCoinRates(coinRates, numberOfRates)) {
      topRatesPhrase += `#${coinRate.coinSymbol} up to ${(
        coinRate.interestRate * 100
      ).toFixed(2)}% at #${coinRate.exchangeName}\n`;
    }
  }
  topRatesPhrase += `\nCheck all rates at https://www.stakinghodlr.com\n\n
    #blockchain #crypto #staking #passiveincome #bitcoin #ethereum #stablecoin`;
  return topRatesPhrase;
};

const getTweetPhraseForSpecificCoinRates = (
  coinRates,
  coinSymbol,
  numberOfRates
) => {
  const specificCoinRates = coinRates
    .filter((c) => c.coinSymbol === coinSymbol)
    .slice(0, numberOfRates);
  if (!specificCoinRates || specificCoinRates.length <= 0) {
    console.warn(`Did not find any coinRates with coin symbol ${coinSymbol}`);
    return "";
  }
  let topRatesPhrase = `Top ${specificCoinRates.length} #${specificCoinRates[0].coinSymbol} staking APYs today:\n\n`;
  for (let index = 0; index < specificCoinRates.length; index++) {
    const coinRate = specificCoinRates[index];
    topRatesPhrase += `${numerals[index + 1]}: ${(
      coinRate.interestRate * 100
    ).toFixed(2)}% at #${coinRate.exchangeName}\n`;
  }
  topRatesPhrase += `\n\nCheck all rates at https://www.stakinghodlr.com\n\n\n#blockchain #crypto #staking #passiveincome #bitcoin #ethereum #stablecoin`;
  return topRatesPhrase;
};

const getTweetPhraseForStableCoins = (coinRates, numberOfRates) => {
  const specificCoinRates = coinRates
    .filter(
      (c) =>
        c.coin &&
        c.coin.categories &&
        c.coin.categories.includes("Top USD stablecoin")
    )
    .slice(0, numberOfRates);
  let topRatesPhrase = `Top ${specificCoinRates.length} USD Stablecoin staking APYs today:\n\n`;
  for (let index = 0; index < specificCoinRates.length; index++) {
    const coinRate = specificCoinRates[index];
    topRatesPhrase += `${numerals[index + 1]}: ${(
      coinRate.interestRate * 100
    ).toFixed(2)}% at #${coinRate.exchangeName}\n`;
  }
  topRatesPhrase += `\n\nCheck all rates at https://www.stakinghodlr.com\n\n\n#blockchain #crypto #staking #passiveincome #bitcoin #ethereum #stablecoin`;
  return topRatesPhrase;
};

// Lambda Payload
// 1: Top coins part 1
// {
//   "coinSymbols": ["USDT", "BTC", "ETH", "BNB"]
// }
// // 2: USD Stablecoins
// {
//     "categories": ["Top USD stablecoin"]
// }
// // 3: Top coins part 2
// {
//   "coinSymbols": ["USDC", "SOL", "LUNA", "ADA"]
// }
// // 4: BTC
// {
//   "coinSymbol": "BTC"
// }
// // 5: ETH
// {
//   "coinSymbol": "ETH"
// }

// // 6: Top rates available
// {}
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const coinRates = await getAllCoinRates();
  console.log("All coinRates", JSON.stringify(coinRates, null, 2));
  let tweet;
  const numberOfRates = event.numberOfRates ? parseInt(event.numberOfRates) : 3;
  if (event.coinSymbol) {
    tweet = getTweetPhraseForSpecificCoinRates(
      coinRates,
      event.coinSymbol,
      numberOfRates
    );
  }
  if (event.coinSymbols) {
    tweet = getTweetPhraseForAllCoinsRates(coinRates, event.coinSymbols);
  }
  if (
    event.categories &&
    event.categories.length > 0 &&
    event.categories[0] === "Top USD stablecoin"
  ) {
    tweet = getTweetPhraseForStableCoins(coinRates, numberOfRates);
  }
  if (!tweet) {
    tweet = getTweetPhraseForAllCoinsRates(coinRates, null, numberOfRates);
  }
  if (!tweet || tweet.length <= 0) {
    console.log(`Empty tweet, not tweeting anything`);
    return null;
  }
  console.log(`Ready to tweet the following:\n ${tweet}`);
  if (event.dontTweet) {
    console.log("Not actually tweeting this...");
    return { tweet };
  }
  await tweetRates(tweet);
  return { tweet };
};
