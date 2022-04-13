const KrakenClient = require('kraken-api');

const getStaking = async (apiKey, apiSecret) => {
  const kraken = new KrakenClient(apiKey, apiSecret);
  const res = await kraken.privateMethod('Staking/Assets');
  console.log("KRAKEN ALL RESULT STAKINGL:", JSON.stringify(res, null, 2));
  const flexibleStaking = res.result.filter(r => !r.lock).map( staking => {
    let interestRate = 0;
    if (staking.rewards.reward && staking.rewards.type === 'percentage') {
      if (staking.rewards.reward.includes('-')) {
        interestRate = Number(staking.rewards.reward.split('-')[1])/100;
      } else {
        interestRate = Number(staking.rewards.reward)/100;
      }
    }
    return {
      coin: staking.asset,
      exchange: 'Kraken',
      minPurchase: staking.minimum_amount.staking,
      userLimit: null,
      interestRate,
    };
  });
  const fixedStaking = res.result.filter(r => r.lock).map( staking => {
    let interestRate = 0;
    if (staking.rewards.reward && staking.rewards.type === 'percentage') {
      if (staking.rewards.reward.includes('-')) {
        interestRate = Number(staking.rewards.reward.split('-')[1])/100;
      } else {
        interestRate = Number(staking.rewards.reward)/100;
      }
    }
    return {
      coin: staking.asset,
      exchange: 'Kraken',
      minPurchase: staking.minimum_amount.staking,
      userLimit: null,
      interestRate,
      duration: staking.lock,
    };
  });

  return [
    ...fixedStaking,
    ...flexibleStaking
  ];
};

module.exports = getStaking;
