/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCoin = /* GraphQL */ `
  subscription OnCreateCoin {
    onCreateCoin {
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
export const onUpdateCoin = /* GraphQL */ `
  subscription OnUpdateCoin {
    onUpdateCoin {
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
export const onDeleteCoin = /* GraphQL */ `
  subscription OnDeleteCoin {
    onDeleteCoin {
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
export const onCreateCoinRate = /* GraphQL */ `
  subscription OnCreateCoinRate {
    onCreateCoinRate {
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
export const onUpdateCoinRate = /* GraphQL */ `
  subscription OnUpdateCoinRate {
    onUpdateCoinRate {
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
export const onDeleteCoinRate = /* GraphQL */ `
  subscription OnDeleteCoinRate {
    onDeleteCoinRate {
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
export const onCreateHistoryCoinRate = /* GraphQL */ `
  subscription OnCreateHistoryCoinRate {
    onCreateHistoryCoinRate {
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
export const onUpdateHistoryCoinRate = /* GraphQL */ `
  subscription OnUpdateHistoryCoinRate {
    onUpdateHistoryCoinRate {
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
export const onDeleteHistoryCoinRate = /* GraphQL */ `
  subscription OnDeleteHistoryCoinRate {
    onDeleteHistoryCoinRate {
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
export const onCreateExchange = /* GraphQL */ `
  subscription OnCreateExchange {
    onCreateExchange {
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
export const onUpdateExchange = /* GraphQL */ `
  subscription OnUpdateExchange {
    onUpdateExchange {
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
export const onDeleteExchange = /* GraphQL */ `
  subscription OnDeleteExchange {
    onDeleteExchange {
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
