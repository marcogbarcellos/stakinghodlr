# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Test api locally

`amplify mock api`

- Most important Queries:

```graphql
mutation coinCreation {
  createCoin(
    input: {name: "Luna", symbol: "LUNA", logoUrl: "https://lh3.googleusercontent.com/d/1YQ4ons4Y6dqWDjYlZasIFoi1evevBHrU"}
    condition: {}
  ) {
    name
    symbol
    logoUrl
  }
}

mutation exchangeCreation {
  createExchange(
    input: {name: "Huobi", logoUrl: "https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5"}
  ) {
    name
    logoUrl
  }
}

query getCoins {
  listCoins {
    items {
      createdAt
      logoUrl
      name
      symbol
      updatedAt
      coinRates {
        items {
          coinNameExchangeName
          interestRate
        }
      }
    }
  }
}

query getExchanges {
  listExchanges {
    items {
      createdAt
      logoUrl
      name
      updatedAt
      coinRates {
        items {
          coinNameExchangeName
          interestRate
        }
      }
    }
  }
}

mutation updateRate {
  updateCoinRate(input: {
    coinNameExchangeName: "COIN#BTC#DATE#2022-04-06T10:58:34.277Z", date: "2022-04-06T10:04:34.277Z", coinSymbol: "BTC", exchangeName: "Binance", interestRate: "0.0265"
  }) {
    coinNameExchangeName
    interestRate
  }
}

mutation deleteRate {
  deleteCoinRate(input:{coinNameExchangeName: "COIN#BTC#DATE#2022-04-06T10:58:34.277Z"}) {
    coinNameExchangeName
  }
}

mutation createCoinRate {
  createCoinRate(
    
    input: {coinNameExchangeName: "COIN#BTC#DATE#2022-04-06T10:58:34.277Z", date: "2022-04-06T10:04:34.277Z", coinSymbol: "BTC", exchangeName: "Binance", interestRate: "0.0365"}
  ) {
    interestRate
    exchangeName
    updatedAt
    date
    createdAt
    coinSymbol
    coinNameExchangeName
  }
}

query listCoins {
  listCoins {
    items {
      logoUrl
      name
      symbol
      coinRates {
        items {
          coinNameExchangeName
          interestRate
          exchangeName
        }
      }
    }
  }
}

query listExchanges {
  listExchanges {
    items {
      name
      logoUrl
      coinRates {
        items {
          coinNameExchangeName
          interestRate
        }
      }
    }
  }
}

query listrates {
  listCoinRates {
    items {
      coinNameExchangeName
    }
  }
}

```

### Manual updates

Some API's like, for example, Kucoin and others unfortunately don't provide access to "Earn/Staking" endpoints, so we will initially add them manually to then create an RPA (selenium or similar) to automate this process at least for the "top" coins.

#### Platforms with their Earn links

Automated through API:

- [Binance](https://www.binance.com/en/earn)
- [Kraken](https://www.kraken.com/features/staking-coins)

Automated through Web Scraping:

- [Crypto.com](https://crypto.com/br/earn)
- [Nexo](https://nexo.io/earn-crypto)
- [Youhodler](https://www.youhodler.com/earn-crypto)
- [Vauld](https://www.vauld.com/rates)

Missing to automate:

- [Kucoin](https://www.kucoin.com/earn)
- [Huobi](https://www.huobi.com/en-us/financial/earn)
- [Celsius](https://celsius.network/earn)
- [Yield App](https://www.yield.app/yld)
- [Guarda](https://guarda.com/staking/)
- [Okx](https://www.okx.com/earn/home)

Tried and haven't finished:

- [Blockfi](https://blockfi.com/rates)
- [Ledn](https://ledn.io/en/btc-savings)
- [Gate.io](https://www.gate.io/hodl)

Skippping for now (few coins, bad rates):
- [Bitfinex](https://staking.bitfinex.com/)
- [Coinbase](https://www.coinbase.com/earn)
- [Gemini](https://www.gemini.com/earn)
- [Bybit](https://www.bybit.com/en-US/earn/home)
