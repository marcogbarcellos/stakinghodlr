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

function Home() {
  const navigate = useNavigate();
  
  const [sortedCoins, setCoinRates] = useState([]);
  const [lockedCoins, setLockedRates] = useState([]);

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
      sevenDaysAgo.setHours(sevenDaysAgo.getHours() - (24 * 7));
      const rateData = await API.graphql(graphqlOperation(listCoinRates, {filter: {and: {date: {ge: sevenDaysAgo.toISOString()}, lockDays: {attributeExists: false}}}}));
      const rates = extractFormattedCoinRates(
        rateData.data.listCoinRates.items
      );
      setCoinRates(rates);
    } catch (error) {
      console.error("error fetching coins", error);
      if (error.data.listCoinRates.items) {
        const rates = extractFormattedCoinRates(
          error.data.listCoinRates.items.filter((i) => i !== null)
        );
        setCoinRates(rates);
      }
    }
  }

  async function fetchLockedRates() {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(sevenDaysAgo.getHours() - (24 * 7));
      const rateData = await API.graphql(graphqlOperation(listCoinRates, {filter: {and: {date: {ge: sevenDaysAgo.toISOString()}, lockDays: {attributeExists: true}}}}));
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

  const coinCard = coinRate => {
    return (
      <Grid
        item
        key={`${coinRate.title}-flex`}
        xs={12}
        md={3}
      >
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
            // subheader={tier.subheader}
            titleTypographyProps={{ align: "center" }}
            // action={tier.title === 'Pro' ? <StarIcon /> : null}
            i
            // subheaderTypographyProps={{
            //   align: 'center',
            // }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 2,
              }}
            >
              <Typography
                component="h5"
                variant="h6"
                color="text.primary"
                style={{ paddingRight: 10 }}
              >
                up to
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                color="text.primary"
                style={{ fontWeight: 800 }}
              >
                {(coinRate.interestRate * 100).toFixed(2)}%
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
              {coinRate.exchanges && (
                <ExchangesTinyList exchanges={coinRate.exchanges} />
              )}
            </ul>
          </CardContent>
          <CardActions>
            <Button fullWidth variant={coinRate.buttonVariant} onClick={() => navigate(`/coins/${coinRate.title}`, { replace: true })}>
              {coinRate.buttonText}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ p: 10 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Top Staking rates
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Get top dollar returns by finding the best staking APYs from the best
          platforms.
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          APYs are updated every day 9am EST time so make sure to follow up on
          the platforms to see if the rates are still valid.
        </Typography>
      </Container>
      <Container maxWidth="xl" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          <Grid
            item
            key="flexible-staking-title"
            xs={12}
          >
            <Typography variant="h5">Flexible Staking</Typography>
          </Grid>
          {sortedCoins.map((coinRate) => coinCard(coinRate))}
        </Grid>
        {lockedCoins.length > 0 && (
          <Grid container spacing={3} alignItems="flex-end" mt={10}>
            <Grid
              item
              key="flexible-staking-title"
              xs={12}
            >
              <Typography variant="h5">Fixed Staking</Typography>
            </Grid>
            {lockedCoins.map((coinRate) => (
              <Grid
                item
                key={`${coinRate.title}-fixex`}
                xs={12}
                md={3}
              >
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
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    i
                    // subheaderTypographyProps={{
                    //   align: 'center',
                    // }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h5"
                        variant="h6"
                        color="text.primary"
                        style={{ paddingRight: 10 }}
                      >
                        up to
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h4"
                        color="text.primary"
                        style={{ fontWeight: 800 }}
                      >
                        {(coinRate.interestRate * 100).toFixed(2)}%
                      </Typography>
                    </Box>
                    <ul>
                      {coinRate.exchanges && (
                        <ExchangesTinyList exchanges={coinRate.exchanges} fixedStaking={true}/>
                      )}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={coinRate.buttonVariant} onClick={() => navigate(`/coins/${coinRate.title}`, { replace: true })}>
                      {coinRate.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Home;
