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
        coinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      exchange {
        name
        logoUrl
        coinRates {
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
        coinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      exchange {
        name
        logoUrl
        coinRates {
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
        coinRates {
          nextToken
        }
        createdAt
        updatedAt
      }
      exchange {
        name
        logoUrl
        coinRates {
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
export const createExchange = /* GraphQL */ `
  mutation CreateExchange(
    $input: CreateExchangeInput!
    $condition: ModelExchangeConditionInput
  ) {
    createExchange(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
