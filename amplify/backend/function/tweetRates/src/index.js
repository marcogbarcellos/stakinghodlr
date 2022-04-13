const AWS = require("aws-sdk");
const {TwitterClient} = require('twitter-api-client')
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
    console.log("error posting to appsync: ", err);
  }
};

const tweetRates = async coinRates => {
  const { Parameters } = await (new AWS.SSM())
  .getParameters({
    Names: ["TWITTER_API_KEY","TWITTER_API_SECRET","TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
  console.log("Parameters",Parameters);
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
  const twitterClient = new TwitterClient({
    apiKey,
    apiSecret,
    accessToken,
    accessTokenSecret,
  });

  twitterClient.tweets.statusesUpdate({
      status: `Fist coin Rate: ${JSON.stringify(coinRates[0])}`
  }).then (response => {
      console.log("Tweeted!", response)
  }).catch(err => {
      console.error(err)
  })
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const coinRates = await getAllCoinRates();
  await tweetRates(coinRates);
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Successfully finished!"),
  };
};
