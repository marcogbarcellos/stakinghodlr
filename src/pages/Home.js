import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardMedia } from '@mui/material';
import ExchangesTinyList from '../components/ExchangesTinyList';
import { listCoinRates } from "../graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify';


// Stop receiving data updates from the subscription
// subscription.unsubscribe();
// const interestRates = [
//   {
//     title: 'Bitcoin',
//     interestRate: '0.05',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1jIwfWBWmUVifMgUrAhpmPP25gHQWTIxc',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Ethereum',
//     // subheader: 'Most popular',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1aZPBydbafN_xsdJ5rmBJDtMgxygfv_M0',
//     interestRate: '0.075',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'USDT Tether',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1m7uqUxkrbFlhlMKuc48qKMRgulToGSqu',
//     interestRate: '0.135',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Solana',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1nXse0ZxVNl5GKI7PUwaEJcdVpS4Mud6S',
//     interestRate: '0.115',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Polkadot',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1KXd0AR3PcoRZNl_-_zCo2mlYJYV4K71b',
//     interestRate: '0.175',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Cardano',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1K18_Dvsdc1DzZPPsX8WCTkHkyNisRGWE',
//     interestRate: '0.045',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'BNB',
//     logoUrl: 'https://lh3.googleusercontent.com/d/10wkm3mrPFnd3UhvoGVeBlhLYszvEHsb3',
//     interestRate: '0.065',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Luna',
//     logoUrl: 'https://lh3.googleusercontent.com/d/1YQ4ons4Y6dqWDjYlZasIFoi1evevBHrU',
//     interestRate: '0.245',
//     exchanges: [
//       {
//         name: 'Binance',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1boyq5ggqGRMRooCVW9dxnJOuyBxOjxbY',
//         interestRate: 0.075,
//       },
//       {
//         name: 'Kucoin',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1wGiCfaq1znluUOfR7FORDgNbpKEHm42e',
//         interestRate: 0.065,
//       },
//       {
//         name: 'Huobi',
//         logoUrl: 'https://lh3.googleusercontent.com/d/1YbIogw5gR073qCLMTzo-P1BkHNfFSRd5',
//         interestRate: 0.065,
//       },
//     ],
//     buttonText: 'See all rates',
//     buttonVariant: 'outlined',
//   },
// ];

function HomeContent() {

  const [sortedCoins, setCoinRates] = useState([]);

  useEffect(() => {
    fetchCoinRates();
  }, []);

  const extractFormattedCoinRates = rates => {
    const sortedCoins = {};
      for (const rate of rates) {
        if (!sortedCoins[rate.coinSymbol]) {
          sortedCoins[rate.coinSymbol] = {};
        }
        sortedCoins[rate.coinSymbol].title = rate.coinSymbol;
        sortedCoins[rate.coinSymbol].logoUrl = rate.coin.logoUrl;
        sortedCoins[rate.coinSymbol].buttonText = 'See all rates';
        sortedCoins[rate.coinSymbol].buttonVariant = 'outlined';
        if (!sortedCoins[rate.coinSymbol].interestRate) {
          sortedCoins[rate.coinSymbol].interestRate = rate.interestRate;  
        }
        if (sortedCoins[rate.coinSymbol].interestRate && sortedCoins[rate.coinSymbol].interestRate < rate.interestRate) {
          sortedCoins[rate.coinSymbol].interestRate = rate.interestRate;
        }
        sortedCoins[rate.coinSymbol].exchanges = [
          ...(sortedCoins[rate.coinSymbol].exchanges || []),
          {
            name: rate.exchangeName,
            logoUrl: rate.exchange.logoUrl,
            interestRate: rate.interestRate,
          },
        ];
      }
      return Object.values(sortedCoins);
  }

  async function fetchCoinRates() {
    try {
      const rateData = await API.graphql(graphqlOperation(listCoinRates));
      const rates = extractFormattedCoinRates(rateData.data.listCoinRates.items);
      setCoinRates(rates);
    } catch (error) {
      console.error("error fetching coins", error);
      if (error.data.listCoinRates.items) {
        const rates = extractFormattedCoinRates(error.data.listCoinRates.items.filter(i => i !== null));
        setCoinRates(rates);
      }
    }
  }

  return (
    <>
      <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Top Staking rates
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Get top dollar returns by finding the best staking APYs from  the best platforms.
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          APYs are updated every day 9am EST time so make sure to follow up 
          on the platforms to see if the rates are still valid.
        </Typography>
      </Container>
      <Container maxWidth="xl" component="main">
        {/* <Grid container spacing={3} alignItems="flex-end">
          {interestRates.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={3}
            >
              <Card>
                {tier.logoUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    style={{ backgroundColor: "#fff", objectFit: "contain" }}
                    image={tier.logoUrl}
                    alt={tier.title}
                    ba
                  />
                )}
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h5" variant="h6" color="text.primary" style={{paddingRight: 10}}>
                      up to
                    </Typography>
                    <Typography component="h3" variant="h4" color="text.primary" style={{fontWeight: 800}}>
                      {tier.interestRate*100}% 
                    </Typography>
                  </Box>
                  <ul>
                    {
                      tier.exchanges && <ExchangesTinyList exchanges={tier.exchanges}/>
                    }
                    
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          
        </Grid> */}
        <Grid container spacing={3} alignItems="flex-end">
          {sortedCoins.map((coinRate) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={coinRate.title}
              xs={12}
              sm={coinRate.title === 'Enterprise' ? 12 : 6}
              md={3}
            >
              <Card>
                {coinRate.logoUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    style={{ backgroundColor: "#fff", objectFit: "contain" }}
                    image={coinRate.logoUrl}
                    alt={coinRate.title}
                    ba
                  />
                )}
                <CardHeader
                  title={coinRate.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  // action={tier.title === 'Pro' ? <StarIcon /> : null}
                  i
                  // subheaderTypographyProps={{
                  //   align: 'center',
                  // }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h5" variant="h6" color="text.primary" style={{paddingRight: 10}}>
                      up to
                    </Typography>
                    <Typography component="h3" variant="h4" color="text.primary" style={{fontWeight: 800}}>
                      {coinRate.interestRate*100}% 
                    </Typography>
                  </Box>
                  <ul>
                    {/* {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))} */}
                    {
                      coinRate.exchanges && <ExchangesTinyList exchanges={coinRate.exchanges}/>
                    }
                    
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={coinRate.buttonVariant}>
                    {coinRate.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          
        </Grid>
        
      </Container>
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
