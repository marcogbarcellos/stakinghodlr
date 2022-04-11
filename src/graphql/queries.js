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
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        historicCoinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
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
      createdAt
      updatedAt
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
        }
        exchange {
          name
          logoUrl
          earnUrl
          createdAt
          updatedAt
        }
        interestRate
        lockDays
        createdAt
        updatedAt
      }
      nextToken
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
      createdAt
      updatedAt
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
        }
        exchange {
          name
          logoUrl
          earnUrl
          createdAt
          updatedAt
        }
        interestRate
        lockDays
        createdAt
        updatedAt
      }
      nextToken
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
        }
        nextToken
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
        }
        nextToken
      }
      createdAt
      updatedAt
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
        }
        historicCoinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;