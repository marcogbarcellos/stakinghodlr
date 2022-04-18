const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;
const binanceStaking = require("./exchanges/binance");
const krakenStaking = require("./exchanges/kraken");
const youhodlerStaking = require("./exchanges/youhodler");
const nexoStaking = require("./exchanges/nexo");
const cryptocomStaking = require("./exchanges/cryptocom");
const vauldStaking = require("./exchanges/vauld");
const geminiStaking = require("./exchanges/gemini");
const guardaStaking = require("./exchanges/guarda");
const kucoinStaking = require("./exchanges/kucoin");
const huobiStaking = require("./exchanges/huobiIncomplete");

const listCoins = gql`
  query ListCoins($nextToken: String) {
    listCoins(nextToken: $nextToken) {
      items {
        symbol
        name
        logoUrl
      }
      nextToken
    }
  }
`;

const createCoin = gql`
  mutation CreateCoin(
    $input: CreateCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    createCoin(input: $input, condition: $condition) {
      symbol
      name
      createdAt
      updatedAt
    }
  }
`;

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

const createCoinRate = gql`
  mutation CreateCoinRate(
    $input: CreateCoinRateInput!
    $condition: ModelCoinRateConditionInput
  ) {
    createCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
    }
  }
`;

// const updateCoinRate = gql`
//   mutation UpdateCoinRate(
//     $input: UpdateCoinRateInput!
//     $condition: ModelCoinRateConditionInput
//   ) {
//     updateCoinRate(input: $input, condition: $condition) {
//       coinNameExchangeName
//       date
//       coinSymbol
//       exchangeName
//     }
//   }
// `;

const createHistoryCoinRate = gql`
  mutation CreateHistoryCoinRate(
    $input: CreateHistoryCoinRateInput!
    $condition: ModelHistoryCoinRateConditionInput
  ) {
    createHistoryCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
        logoUrl
        type
        coinRates {
          nextToken
        }
        historicCoinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      exchange {
        name
        logoUrl
        earnUrl
        coinRates {
          nextToken
        }
        historicCoinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      interestRate
      lockDays
      origin
      createdAt
      updatedAt
    }
  }
`;

const deleteCoinRate = gql`
  mutation DeleteCoinRate(
    $input: DeleteCoinRateInput!
    $condition: ModelCoinRateConditionInput
  ) {
    deleteCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
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

const cleanupDynamicallyInsertedRates = async (allRates) => {
  const dynamicRates = allRates.filter(
    (r) => r.origin === "dynamic_api_insertion"
  );
  for (const rate of dynamicRates) {
    try {
      const historyRate = {
        coinNameExchangeName: rate.coinNameExchangeName,
        date: rate.date,
        coinSymbol: rate.coinSymbol,
        exchangeName: rate.exchangeName,
        interestRate: rate.interestRate,
        lockDays: rate.lockDays,
        origin: rate.origin,
      };
      await axios({
        url: process.env.API_STAKINGHODLR_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_STAKINGHODLR_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(createHistoryCoinRate),
          variables: {
            input: historyRate,
          },
        },
      });
      await axios({
        url: process.env.API_STAKINGHODLR_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_STAKINGHODLR_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(deleteCoinRate),
          variables: {
            input: { coinNameExchangeName: rate.coinNameExchangeName },
          },
        },
      });
    } catch (error) {
      console.log(
        "error delete old dynamically inserted coin rates and saving to history",
        error
      );
    }
  }
  console.log(
    "Successfully cleaned up coinRates from old dynamic rates and inserted into history"
  );
};

const getAllStakings = async () => {
  try {
    const { Parameters } = await new AWS.SSM()
      .getParameters({
        Names: [
          "BINANCE_API_KEY",
          "BINANCE_API_SECRET",
          "KRAKEN_API_KEY",
          "KRAKEN_API_SECRET",
        ].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    const binanceApiKey = Parameters.find((p) =>
      p.Name.includes("BINANCE_API_KEY")
    ).Value;
    const binanceApiSecret = Parameters.find((p) =>
      p.Name.includes("BINANCE_API_SECRET")
    ).Value;
    const krakenApiKey = Parameters.find((p) =>
      p.Name.includes("KRAKEN_API_KEY")
    ).Value;
    const krakenApiSecret = Parameters.find((p) =>
      p.Name.includes("KRAKEN_API_SECRET")
    ).Value;
    const [
      binance,
      kraken,
      youhodler,
      nexo,
      cryptocom,
      vauld,
      gemini,
      guarda,
      kucoin,
      huobi,
    ] = await Promise.all([
      binanceStaking(binanceApiKey, binanceApiSecret),
      krakenStaking(krakenApiKey, krakenApiSecret),
      youhodlerStaking(),
      nexoStaking(),
      cryptocomStaking(),
      vauldStaking(),
      geminiStaking(),
      guardaStaking(),
      kucoinStaking(),
      huobiStaking(),
    ]);
    console.log("binance response", binance);
    console.log("kraken response", kraken);
    console.log("youhodler response", youhodler);
    console.log("nexo response", nexo);
    console.log("crypto.com response", cryptocom);
    console.log("vauld response", vauld);
    console.log("gemini response", gemini);
    console.log("guarda response", guarda);
    console.log("kucoin response", kucoin);
    console.log("huobi response", huobi);
    return [
      ...binance,
      ...kraken,
      ...youhodler,
      ...nexo,
      ...cryptocom,
      ...vauld,
      ...gemini,
      ...guarda,
      ...kucoin,
      ...huobi,
    ];
  } catch (error) {
    console.error("error", error);
  }
};

const upsertUnexistingCoins = async (coins, stakings) => {
  const coinMap = coins.reduce((map, coin) => {
    map[coin.symbol] = 1;
    return map;
  }, {});
  const insertingCoins = [];
  for (const stake of stakings) {
    if (!coinMap[stake.coin]) {
      insertingCoins.push({
        symbol: stake.coin,
        name: stake.coin,
      });
    }
  }
  if (insertingCoins.length > 0) {
    for (const coin of insertingCoins) {
      try {
        await axios({
          url: process.env.API_STAKINGHODLR_GRAPHQLAPIENDPOINTOUTPUT,
          method: "post",
          headers: {
            "x-api-key": process.env.API_STAKINGHODLR_GRAPHQLAPIKEYOUTPUT,
          },
          data: {
            query: print(createCoin),
            variables: {
              input: { ...coin, type: "AUTO_GENERATED" },
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

const insertCoinRates = async (stakings) => {
  const coinRates = stakings.map((stake) => ({
    coinNameExchangeName: `COIN#${stake.coin}#EXCHANGE#${
      stake.exchange
    }#LOCK_DAYS#${stake.duration > 0 ? stake.duration : 0}`,
    date: new Date().toISOString(),
    coinSymbol: stake.coin,
    exchangeName: stake.exchange,
    interestRate: stake.interestRate,
    lockDays: stake.duration,
    origin: "dynamic_api_insertion",
  }));
  console.log(`insertingCOinRATES`, JSON.stringify(coinRates, null, 2));
  for (const coinRate of coinRates) {
    try {
      await axios({
        url: process.env.API_STAKINGHODLR_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_STAKINGHODLR_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(createCoinRate),
          variables: {
            input: { ...coinRate, origin: "dynamic_api_insertion" },
          },
        },
      });
    } catch (error) {
      console.error("Inserting coin rate failed", error);
    }
  }
  console.log(`created all coinRates`);
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const [coins, coinRates, allStakings] = await Promise.all([
    getAllCoins(),
    getAllCoinRates(),
    getAllStakings(),
  ])
  // const coins = await getAllCoins();
  // const coinRates = await getAllCoinRates();
  // const allStakings = await getAllStakings();
  console.log("coins", JSON.stringify(coins, null, 2));
  console.log("coinRates", JSON.stringify(coinRates, null, 2));
  console.log("allStakings", JSON.stringify(allStakings, null, 2));
  // create coins if they don't exist
  await upsertUnexistingCoins(coins, allStakings);
  // remove all current dynamic api insertions (and save history)
  await cleanupDynamicallyInsertedRates(coinRates);
  // Persist new (and valid) coin rates
  await insertCoinRates(allStakings);
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
