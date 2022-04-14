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
        # exchange {
        #   twitterAccount
        # }
        interestRate
        lockDays
        origin
      }
      nextToken
    }
  }
`;

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

    return items;
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
  console.log("Parameters", Parameters);
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

const getTweetPhraseForAllCoinsRates = (coinRates) => {
  let topRatesPhrase = `Top ${coinRates.length} staking APYs today:\n\n`;
  for (let index = 0; index < coinRates.length; index++) {
    const coinRate = coinRates[index];
    topRatesPhrase += `#${index+1}: ${coinRate.coinSymbol} with ${(
      coinRate.interestRate * 100
    ).toFixed(2)}% at ${coinRate.exchangeName}\n`;
  }
  topRatesPhrase += `\n\nCheck all rates at https://www.stakinghodlr.com\n\n\n `;
  const uniqueCoinsTags = [...new Set(coinRates.map(c => `#${c.coinSymbol}`))].join(" ");
  const uniqueExchangesTags = [...new Set(coinRates.map(c => `#${c.exchangeName}`))].join(" ");
  topRatesPhrase += `#blockchain #crypto #staking #passiveincome #income ${uniqueCoinsTags} ${uniqueExchangesTags}`;
  return topRatesPhrase;
};

const getTweetPhraseForSpecificCoinsRates = (coinRates) => {
  let topRatesPhrase = `Top ${coinRates.length} ${coinRates[0].coinSymbol} staking APYs today:\n\n`;
  for (let index = 0; index < coinRates.length; index++) {
    const coinRate = coinRates[index];
    topRatesPhrase += `#${index+1}: ${(coinRate.interestRate * 100).toFixed(2)}% at ${
      coinRate.exchangeName
    }\n`;
  }
  topRatesPhrase += `\n\nCheck all rates at https://www.stakinghodlr.com\n\n\n `;
  const uniqueExchangesTags = [...new Set(coinRates.map(c => `#${c.exchangeName}`))].join(" ");
  topRatesPhrase += `#blockchain #crypto #staking #passiveincome #income #${coinRates[0].coinSymbol} ${uniqueExchangesTags}`;
  return topRatesPhrase;
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // default number of rates to 3 (remember tweets have limited lengths)
  const numberOfRates = event.numberOfRates ? parseInt(event.numberOfRates) : 3;
  const coinRates = await getAllCoinRates();
  console.log(`coinRates`, JSON.stringify(coinRates, null, 2));
  const topRates = getTopCoinRates(coinRates, numberOfRates, event.coinSymbol);
  const tweet = event.coinSymbol
  ? getTweetPhraseForSpecificCoinsRates(topRates)
  : getTweetPhraseForAllCoinsRates(topRates);
  console.log(`Ready to tweet the following:\n ${tweet}`);
  await tweetRates(tweet);
  return event;
};
