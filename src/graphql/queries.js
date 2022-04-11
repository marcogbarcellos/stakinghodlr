/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoin = /* GraphQL */ `
  query GetCoin($symbol: String!) {
    getCoin(symbol: $symbol) {
      symbol
      name
      logoUrl
      coinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          interestRate
          lockDays
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      historicCoinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          interestRate
          lockDays
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCoins = /* GraphQL */ `
  query ListCoins(
    $symbol: String
    $filter: ModelCoinFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCoins(
      symbol: $symbol
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        symbol
        name
        logoUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCoins = /* GraphQL */ `
  query SyncCoins(
    $filter: ModelCoinFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCoins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        symbol
        name
        logoUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCoinRate = /* GraphQL */ `
  query GetCoinRate($coinNameExchangeName: String!) {
    getCoinRate(coinNameExchangeName: $coinNameExchangeName) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
        logoUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      exchange {
        name
        logoUrl
        earnUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      interestRate
      lockDays
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCoinRates = /* GraphQL */ `
  query ListCoinRates(
    $coinNameExchangeName: String
    $filter: ModelCoinRateFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCoinRates(
      coinNameExchangeName: $coinNameExchangeName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        coinNameExchangeName
        date
        coinSymbol
        exchangeName
        coin {
          symbol
          name
          logoUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        exchange {
          name
          logoUrl
          earnUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        interestRate
        lockDays
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCoinRates = /* GraphQL */ `
  query SyncCoinRates(
    $filter: ModelCoinRateFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCoinRates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        coinNameExchangeName
        date
        coinSymbol
        exchangeName
        coin {
          symbol
          name
          logoUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        exchange {
          name
          logoUrl
          earnUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        interestRate
        lockDays
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getHistoryCoinRate = /* GraphQL */ `
  query GetHistoryCoinRate(
    $coinNameExchangeName: String!
    $date: AWSDateTime!
  ) {
    getHistoryCoinRate(
      coinNameExchangeName: $coinNameExchangeName
      date: $date
    ) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
        logoUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      exchange {
        name
        logoUrl
        earnUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      interestRate
      lockDays
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listHistoryCoinRates = /* GraphQL */ `
  query ListHistoryCoinRates(
    $coinNameExchangeName: String
    $date: ModelStringKeyConditionInput
    $filter: ModelHistoryCoinRateFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHistoryCoinRates(
      coinNameExchangeName: $coinNameExchangeName
      date: $date
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        coinNameExchangeName
        date
        coinSymbol
        exchangeName
        coin {
          symbol
          name
          logoUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        exchange {
          name
          logoUrl
          earnUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        interestRate
        lockDays
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHistoryCoinRates = /* GraphQL */ `
  query SyncHistoryCoinRates(
    $filter: ModelHistoryCoinRateFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHistoryCoinRates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        coinNameExchangeName
        date
        coinSymbol
        exchangeName
        coin {
          symbol
          name
          logoUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        exchange {
          name
          logoUrl
          earnUrl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        interestRate
        lockDays
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getExchange = /* GraphQL */ `
  query GetExchange($name: String!) {
    getExchange(name: $name) {
      name
      logoUrl
      earnUrl
      coinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          interestRate
          lockDays
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      historicCoinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          interestRate
          lockDays
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listExchanges = /* GraphQL */ `
  query ListExchanges(
    $name: String
    $filter: ModelExchangeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listExchanges(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        logoUrl
        earnUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncExchanges = /* GraphQL */ `
  query SyncExchanges(
    $filter: ModelExchangeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncExchanges(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        name
        logoUrl
        earnUrl
        coinRates {
          nextToken
          startedAt
        }
        historicCoinRates {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
