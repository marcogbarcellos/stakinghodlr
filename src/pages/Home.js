import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CardMedia } from "@mui/material";
import ExchangesTinyList from "../components/ExchangesTinyList";
import { listCoinRates } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function Home() {
  const navigate = useNavigate();

  const [flexRates, setFlexRates] = useState([]);
  const [lockedRates, setLockedRates] = useState([]);

  useEffect(() => {
    fetchCoinRates();
    fetchLockedRates();
  }, []);

  const extractFormattedCoinRates = (rates) => {
    const sortedCoins = {};
    for (const rate of rates) {
      if (!sortedCoins[rate.coinSymbol]) {
        sortedCoins[rate.coinSymbol] = {};
      }
      sortedCoins[rate.coinSymbol].title = rate.coinSymbol;
      sortedCoins[rate.coinSymbol].logoUrl = rate.coin.logoUrl;
      sortedCoins[rate.coinSymbol].buttonText = "See all rates";
      sortedCoins[rate.coinSymbol].buttonVariant = "outlined";
      if (!sortedCoins[rate.coinSymbol].interestRate) {
        sortedCoins[rate.coinSymbol].interestRate = rate.interestRate;
      }
      if (
        sortedCoins[rate.coinSymbol].interestRate &&
        sortedCoins[rate.coinSymbol].interestRate < rate.interestRate
      ) {
        sortedCoins[rate.coinSymbol].interestRate = rate.interestRate;
      }
      sortedCoins[rate.coinSymbol].exchanges = [
        ...(sortedCoins[rate.coinSymbol].exchanges || []),
        {
          name: rate.exchangeName,
          logoUrl: rate.exchange.logoUrl,
          interestRate: rate.interestRate,
          lockDays: rate.lockDays,
        },
      ];
    }
    return Object.values(sortedCoins);
  };

  async function fetchCoinRates() {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(sevenDaysAgo.getHours() - 24 * 7);
      const rateData = await API.graphql(
        graphqlOperation(listCoinRates, {
          filter: {
            and: {
              date: { ge: sevenDaysAgo.toISOString() },
              lockDays: { attributeExists: false },
            },
          },
        })
      );
      const rates = extractFormattedCoinRates(
        rateData.data.listCoinRates.items
      );
      setFlexRates(rates);
    } catch (error) {
      console.error("error fetching coins", error);
      if (error.data.listCoinRates.items) {
        const rates = extractFormattedCoinRates(
          error.data.listCoinRates.items.filter((i) => i !== null)
        );
        setFlexRates(rates);
      }
    }
  }

  async function fetchLockedRates() {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(sevenDaysAgo.getHours() - 24 * 7);
      const rateData = await API.graphql(
        graphqlOperation(listCoinRates, {
          filter: {
            and: {
              date: { ge: sevenDaysAgo.toISOString() },
              lockDays: { attributeExists: true },
            },
          },
        })
      );
      const rates = extractFormattedCoinRates(
        rateData.data.listCoinRates.items
      );
      setLockedRates(rates);
    } catch (error) {
      console.error("error fetching coins", error);
      if (error.data.listCoinRates.items) {
        const rates = extractFormattedCoinRates(
          error.data.listCoinRates.items.filter((i) => i !== null)
        );
        setLockedRates(rates);
      }
    }
  }

  const flexRateCard = (coinRate) => {
    return (
      <Grid item key={`${coinRate.title}-flex`} xs={12} md={3}>
        <Card>
          {coinRate.logoUrl && (
            <CardMedia
              component="img"
              height="200"
              style={{ backgroundColor: "#fff", objectFit: "contain" }}
              image={coinRate.logoUrl}
              alt={`${coinRate.title}-flex`}
              ba
            />
          )}
          <CardHeader
            title={coinRate.title}
            subheader={`Best rate: ${(coinRate.interestRate * 100).toFixed(
              2
            )}%`}
            titleTypographyProps={{ align: "center", variant: "h4" }}
            // action={tier.title === 'Pro' ? <StarIcon /> : null}
            subheaderTypographyProps={{
              align: "center",
              variant: "h6",
            }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <ul>
              {coinRate.exchanges && (
                <ExchangesTinyList exchanges={coinRate.exchanges} />
              )}
            </ul>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant={coinRate.buttonVariant}
              onClick={() =>
                navigate(`/coins/${coinRate.title}`, { replace: true })
              }
            >
              {coinRate.buttonText}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  const lockedRateCard = (coinRate) => {
    return (
      <Grid item key={`${coinRate.title}-fixex`} xs={12} md={3}>
        <Card>
          {coinRate.logoUrl && (
            <CardMedia
              component="img"
              height="200"
              style={{ backgroundColor: "#fff", objectFit: "contain" }}
              image={coinRate.logoUrl}
              alt={`${coinRate.title}-fixed`}
              ba
            />
          )}
          <CardHeader
            title={coinRate.title}
            subheader={`Best rate: ${(coinRate.interestRate * 100).toFixed(
              2
            )}%`}
            titleTypographyProps={{ align: "center", variant: "h4" }}
            // action={tier.title === 'Pro' ? <StarIcon /> : null}
            subheaderTypographyProps={{
              align: "center",
              variant: "h6",
            }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <ul>
              {coinRate.exchanges && (
                <ExchangesTinyList
                  exchanges={coinRate.exchanges}
                  fixedStaking={true}
                />
              )}
            </ul>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant={coinRate.buttonVariant}
              onClick={() =>
                navigate(`/coins/${coinRate.title}`, { replace: true })
              }
            >
              {coinRate.buttonText}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };
  console.log(flexRates);
  const btcCoinFlexRate = flexRates.find((c) => c.title === "BTC");
  const ethCoinFlexRate = flexRates.find((c) => c.title === "ETH");
  const usdtCoinFlexRate = flexRates.find((c) => c.title === "USDT");
  const usdcCoinFlexRate = flexRates.find((c) => c.title === "USDC");
  const filteredFlexRates = flexRates.filter(
    (c) => !["BTC", "ETH", "USDC", "USDT"].includes(c.title)
  );
  const btcCoinLockedRate = lockedRates.find((c) => c.title === "BTC");
  const ethCoinLockedRate = lockedRates.find((c) => c.title === "ETH");
  const usdtCoinLockedRate = lockedRates.find((c) => c.title === "USDT");
  const usdcCoinLockedRate = lockedRates.find((c) => c.title === "USDC");
  const filteredLockedRates = lockedRates.filter(
    (c) => !["BTC", "ETH", "USDC", "USDT"].includes(c.title)
  );
  return (
    <>
      <Container disableGutters maxWidth="xl" component="main" sx={{ p: 2 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Top Staking rates
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Browse the best staking APYs available from one single place.
        </Typography>
        {/* <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          component="p"
        >
          APYs are updated every day 9am EST time so make sure to follow up on
          the platforms to see if the rates are still valid.
        </Typography> */}
      </Container>
      <Container maxWidth="xl" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item key="flexible-staking-title" xs={12}>
            <Typography variant="h5">Flexible Staking</Typography>
          </Grid>
          {btcCoinFlexRate && flexRateCard(btcCoinFlexRate)}
          {ethCoinFlexRate && flexRateCard(ethCoinFlexRate)}
          {usdtCoinFlexRate && flexRateCard(usdtCoinFlexRate)}
          {usdcCoinFlexRate && flexRateCard(usdcCoinFlexRate)}
          {filteredFlexRates.map((coinRate) => flexRateCard(coinRate))}
        </Grid>
        {lockedRates.length > 0 && (
          <Grid container spacing={3} alignItems="flex-end" mt={10}>
            <Grid item key="flexible-staking-title" xs={12}>
              <Typography variant="h5">Fixed Staking</Typography>
            </Grid>
            {btcCoinLockedRate && lockedRateCard(btcCoinLockedRate)}
            {ethCoinLockedRate && lockedRateCard(ethCoinLockedRate)}
            {usdtCoinLockedRate && lockedRateCard(usdtCoinLockedRate)}
            {usdcCoinLockedRate && lockedRateCard(usdcCoinLockedRate)}
            {filteredLockedRates.map((coinRate) => lockedRateCard(coinRate))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Home;
