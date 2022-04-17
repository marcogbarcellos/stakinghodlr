const { Spot } = require("@binance/connector");

const getFixedStaking = async (client) => {
  const data = (
    await client.savingsProductList("CUSTOMIZED_FIXED")
  ).data;
  const staking = data.map((f) => ({
    coin: f.asset,
    exchange: "Binance",
    interestRate: f.interestRate,
    userLimit: Number(f.lotSize) * Number(f.maxLotsPerUser),
    minPurchase: f.lotSize,
    duration: f.duration,
  }));
  return staking;
};

const getFlexibleStaking = async (client) => {
  const data = (await client.savingsFlexibleProducts()).data;
  const staking = data.map((f) => ({
    coin: f.asset,
    exchange: "Binance",
    interestRate: f.avgAnnualInterestRate,
    userLimit: f.upLimitPerUser,
    minPurchase: f.minPurchaseAmount,
  }));
  return staking;
};

const getStaking = async (apiKey, apiSecret) => {
  const client = new Spot(apiKey, apiSecret);
  const [fixedStaking, flexibleStaking] = await Promise.all([
    getFixedStaking(client),
    getFlexibleStaking(client),
  ]);
  return [...fixedStaking, ...flexibleStaking];
};

module.exports = getStaking;
