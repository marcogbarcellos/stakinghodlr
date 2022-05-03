/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCoin = /* GraphQL */ `
  subscription OnCreateCoin {
    onCreateCoin {
      symbol
      name
      logoUrl
      largeLogoUrl
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
export const onUpdateCoin = /* GraphQL */ `
  subscription OnUpdateCoin {
    onUpdateCoin {
      symbol
      name
      logoUrl
      largeLogoUrl
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
export const onDeleteCoin = /* GraphQL */ `
  subscription OnDeleteCoin {
    onDeleteCoin {
      symbol
      name
      logoUrl
      largeLogoUrl
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
        largeLogoUrl
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
        largeLogoUrl
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
        largeLogoUrl
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
        largeLogoUrl
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
        largeLogoUrl
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
        largeLogoUrl
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
export const onCreateExchange = /* GraphQL */ `
  subscription OnCreateExchange {
    onCreateExchange {
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
export const onUpdateExchange = /* GraphQL */ `
  subscription OnUpdateExchange {
    onUpdateExchange {
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
export const onDeleteExchange = /* GraphQL */ `
  subscription OnDeleteExchange {
    onDeleteExchange {
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
export const onCreateMailList = /* GraphQL */ `
  subscription OnCreateMailList {
    onCreateMailList {
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMailList = /* GraphQL */ `
  subscription OnUpdateMailList {
    onUpdateMailList {
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMailList = /* GraphQL */ `
  subscription OnDeleteMailList {
    onDeleteMailList {
      email
      createdAt
      updatedAt
    }
  }
`;
