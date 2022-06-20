/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoin = /* GraphQL */ `
  query GetCoin($symbol: String!) {
    getCoin(symbol: $symbol) {
      symbol
      name
      fullName
      logoUrl
      type
      platform
      categories
      coinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          interestRate
          lockDays
          origin
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
          origin
          createdAt
          updatedAt
        }
        nextToken
      }
      sortIndex
      to_remove
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
        fullName
        logoUrl
        type
        platform
        categories
        coinRates {
          nextToken
        }
        historicCoinRates {
          nextToken
        }
        sortIndex
        to_remove
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
        fullName
        logoUrl
        type
        platform
        categories
        coinRates {
          nextToken
        }
        historicCoinRates {
          nextToken
        }
        sortIndex
        to_remove
        createdAt
        updatedAt
      }
      exchange {
        name
        logoUrl
        earnUrl
        referralUrl
        twitterAccount
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
          fullName
          logoUrl
          type
          platform
          categories
          sortIndex
          to_remove
          createdAt
          updatedAt
        }
        exchange {
          name
          logoUrl
          earnUrl
          referralUrl
          twitterAccount
          createdAt
          updatedAt
        }
        interestRate
        lockDays
        origin
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
        fullName
        logoUrl
        type
        platform
        categories
        coinRates {
          nextToken
        }
        historicCoinRates {
          nextToken
        }
        sortIndex
        to_remove
        createdAt
        updatedAt
      }
      exchange {
        name
        logoUrl
        earnUrl
        referralUrl
        twitterAccount
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
          fullName
          logoUrl
          type
          platform
          categories
          sortIndex
          to_remove
          createdAt
          updatedAt
        }
        exchange {
          name
          logoUrl
          earnUrl
          referralUrl
          twitterAccount
          createdAt
          updatedAt
        }
        interestRate
        lockDays
        origin
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
      referralUrl
      twitterAccount
      coinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          interestRate
          lockDays
          origin
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
          origin
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
        referralUrl
        twitterAccount
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
export const getMailList = /* GraphQL */ `
  query GetMailList($email: String!) {
    getMailList(email: $email) {
      email
      createdAt
      updatedAt
    }
  }
`;
export const listMailLists = /* GraphQL */ `
  query ListMailLists(
    $email: String
    $filter: ModelMailListFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMailLists(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
