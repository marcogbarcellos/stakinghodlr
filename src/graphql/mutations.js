/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCoin = /* GraphQL */ `
  mutation CreateCoin(
    $input: CreateCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    createCoin(input: $input, condition: $condition) {
      symbol
      name
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
      createdAt
      updatedAt
    }
  }
`;
export const updateCoin = /* GraphQL */ `
  mutation UpdateCoin(
    $input: UpdateCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    updateCoin(input: $input, condition: $condition) {
      symbol
      name
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteCoin = /* GraphQL */ `
  mutation DeleteCoin(
    $input: DeleteCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    deleteCoin(input: $input, condition: $condition) {
      symbol
      name
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
      createdAt
      updatedAt
    }
  }
`;
export const createCoinRate = /* GraphQL */ `
  mutation CreateCoinRate(
    $input: CreateCoinRateInput!
    $condition: ModelCoinRateConditionInput
  ) {
    createCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
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
export const updateCoinRate = /* GraphQL */ `
  mutation UpdateCoinRate(
    $input: UpdateCoinRateInput!
    $condition: ModelCoinRateConditionInput
  ) {
    updateCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
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
export const deleteCoinRate = /* GraphQL */ `
  mutation DeleteCoinRate(
    $input: DeleteCoinRateInput!
    $condition: ModelCoinRateConditionInput
  ) {
    deleteCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
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
export const createHistoryCoinRate = /* GraphQL */ `
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
        platform
        categories
        coinRates {
          nextToken
        }
        historicCoinRates {
          nextToken
        }
        sortIndex
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
export const updateHistoryCoinRate = /* GraphQL */ `
  mutation UpdateHistoryCoinRate(
    $input: UpdateHistoryCoinRateInput!
    $condition: ModelHistoryCoinRateConditionInput
  ) {
    updateHistoryCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
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
export const deleteHistoryCoinRate = /* GraphQL */ `
  mutation DeleteHistoryCoinRate(
    $input: DeleteHistoryCoinRateInput!
    $condition: ModelHistoryCoinRateConditionInput
  ) {
    deleteHistoryCoinRate(input: $input, condition: $condition) {
      coinNameExchangeName
      date
      coinSymbol
      exchangeName
      coin {
        symbol
        name
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
export const createExchange = /* GraphQL */ `
  mutation CreateExchange(
    $input: CreateExchangeInput!
    $condition: ModelExchangeConditionInput
  ) {
    createExchange(input: $input, condition: $condition) {
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
export const updateExchange = /* GraphQL */ `
  mutation UpdateExchange(
    $input: UpdateExchangeInput!
    $condition: ModelExchangeConditionInput
  ) {
    updateExchange(input: $input, condition: $condition) {
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
export const deleteExchange = /* GraphQL */ `
  mutation DeleteExchange(
    $input: DeleteExchangeInput!
    $condition: ModelExchangeConditionInput
  ) {
    deleteExchange(input: $input, condition: $condition) {
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
export const createMailList = /* GraphQL */ `
  mutation CreateMailList(
    $input: CreateMailListInput!
    $condition: ModelMailListConditionInput
  ) {
    createMailList(input: $input, condition: $condition) {
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateMailList = /* GraphQL */ `
  mutation UpdateMailList(
    $input: UpdateMailListInput!
    $condition: ModelMailListConditionInput
  ) {
    updateMailList(input: $input, condition: $condition) {
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteMailList = /* GraphQL */ `
  mutation DeleteMailList(
    $input: DeleteMailListInput!
    $condition: ModelMailListConditionInput
  ) {
    deleteMailList(input: $input, condition: $condition) {
      email
      createdAt
      updatedAt
    }
  }
`;
