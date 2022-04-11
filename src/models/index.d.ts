import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CoinMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CoinRateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ExchangeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HistoryCoinRateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Coin {
  readonly id: string;
  readonly symbol: string;
  readonly name: string;
  readonly logoUrl?: string | null;
  readonly coinRates?: (CoinRate | null)[] | null;
  readonly historicCoinRates?: (HistoryCoinRate | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Coin, CoinMetaData>);
  static copyOf(source: Coin, mutator: (draft: MutableModel<Coin, CoinMetaData>) => MutableModel<Coin, CoinMetaData> | void): Coin;
}

export declare class CoinRate {
  readonly id: string;
  readonly coinNameExchangeName: string;
  readonly date: string;
  readonly coin: Coin;
  readonly exchange: Exchange;
  readonly interestRate: string;
  readonly lockDays?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CoinRate, CoinRateMetaData>);
  static copyOf(source: CoinRate, mutator: (draft: MutableModel<CoinRate, CoinRateMetaData>) => MutableModel<CoinRate, CoinRateMetaData> | void): CoinRate;
}

export declare class Exchange {
  readonly id: string;
  readonly name: string;
  readonly logoUrl?: string | null;
  readonly earnUrl?: string | null;
  readonly coinRates?: (CoinRate | null)[] | null;
  readonly historicCoinRates?: (HistoryCoinRate | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Exchange, ExchangeMetaData>);
  static copyOf(source: Exchange, mutator: (draft: MutableModel<Exchange, ExchangeMetaData>) => MutableModel<Exchange, ExchangeMetaData> | void): Exchange;
}

export declare class HistoryCoinRate {
  readonly id: string;
  readonly coinNameExchangeName: string;
  readonly date: string;
  readonly coin: Coin;
  readonly exchange: Exchange;
  readonly interestRate: string;
  readonly lockDays?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<HistoryCoinRate, HistoryCoinRateMetaData>);
  static copyOf(source: HistoryCoinRate, mutator: (draft: MutableModel<HistoryCoinRate, HistoryCoinRateMetaData>) => MutableModel<HistoryCoinRate, HistoryCoinRateMetaData> | void): HistoryCoinRate;
}