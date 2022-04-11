// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Coin, CoinRate, Exchange, HistoryCoinRate } = initSchema(schema);

export {
  Coin,
  CoinRate,
  Exchange,
  HistoryCoinRate
};