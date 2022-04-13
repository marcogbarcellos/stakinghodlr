import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CardMedia } from "@mui/material";
import ExchangesTinyList from "../components/ExchangesTinyList";
import { listCoinRates } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [rateType, setRateType] = React.useState("all");
  const [coinType, setCoinType] = React.useState("top");
  const [topCoinsRates, setTopCoinsRates] = useState([]);
  const [otherCoinsRates, setOtherCoinsRates] = useState([]);
  const [topCoinsFlexRates, setTopCoinsFlexRates] = useState([]);
  const [otherCoinsFlexRates, setOtherCoinsFlexRates] = useState([]);
  const [topCoinsFixedRates, setTopCoinsFixedRates] = useState([]);
  const [otherCoinsFixedRates, setOtherCoinsFixedRates] = useState([]);

  useEffect(() => {
    fetchCoinRates();
  }, []);

  const getFormattedCoinsMap = (rates) => {
    const sortedCoins = {};
    for (const rate of rates) {
      if (!sortedCoins[rate.coinSymbol]) {
        sortedCoins[rate.coinSymbol] = {};
      }
      sortedCoins[rate.coinSymbol].title = rate.coinSymbol;
      sortedCoins[rate.coinSymbol].type = rate.coin.type;
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
    return sortedCoins;
  };
  const getTopAndOtherCoinsFromMap = (ratesMap) => {
    let topCoinsRates = [];
    const otherCoinsRates = [];
    for (const sortedCoin of Object.values(ratesMap)) {
      if (sortedCoin.type === "TOP") {
        topCoinsRates.push(sortedCoin);
        continue;
      }
      otherCoinsRates.push(sortedCoin);
    }
    // ordering top coins
    topCoinsRates = [
      ...topCoinsRates.filter((c) => c.title === "BTC"),
      ...topCoinsRates.filter((c) => c.title === "ETH"),
      ...topCoinsRates.filter((c) => c.title === "USDT"),
      ...topCoinsRates.filter((c) => c.title === "USDC"),
      ...topCoinsRates.filter(
        (c) => !["BTC", "ETH", "USDT", "USDC"].includes(c.title)
      ),
    ];
    return { topCoinsRates, otherCoinsRates };
  };

  const extractFormattedCoinRates = (rates) => {
    const allRates = getFormattedCoinsMap(rates);
    const fixedTermRates = getFormattedCoinsMap(
      rates.filter((r) => r.lockDays > 0)
    );
    const flexTermRates = getFormattedCoinsMap(
      rates.filter((r) => !r.lockDays)
    );
    const {
      topCoinsRates: topCoinsFixedRates,
      otherCoinsRates: otherCoinsFixedRates,
    } = getTopAndOtherCoinsFromMap(fixedTermRates);
    const {
      topCoinsRates: topCoinsFlexRates,
      otherCoinsRates: otherCoinsFlexRates,
    } = getTopAndOtherCoinsFromMap(flexTermRates);
    const { topCoinsRates, otherCoinsRates } =
      getTopAndOtherCoinsFromMap(allRates);
    return {
      topCoinsRates,
      otherCoinsRates,
      topCoinsFlexRates,
      otherCoinsFlexRates,
      topCoinsFixedRates,
      otherCoinsFixedRates,
    };
  };

  async function fetchCoinRates() {
    try {
      let nextToken;
      let items = [];
      do {
        const rateData = await API.graphql(
          graphqlOperation(listCoinRates, { nextToken })
        );
        items = [...items, ...(rateData.data.listCoinRates.items || [])];
        nextToken = rateData.data.listCoinRates.nextToken;
      } while (nextToken);
      const {
        topCoinsRates,
        otherCoinsRates,
        topCoinsFlexRates,
        otherCoinsFlexRates,
        topCoinsFixedRates,
        otherCoinsFixedRates,
      } = extractFormattedCoinRates(items);
      console.log("items", items);
      console.log("topCoinsFlexRates", topCoinsFlexRates);
      console.log("topCoinsFixedRates", topCoinsFixedRates);
      setTopCoinsRates(topCoinsRates);
      setOtherCoinsRates(otherCoinsRates);
      setTopCoinsFlexRates(topCoinsFlexRates);
      setTopCoinsFixedRates(topCoinsFixedRates);
      setOtherCoinsFlexRates(otherCoinsFlexRates);
      setOtherCoinsFixedRates(otherCoinsFixedRates);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  }

  const ratesCard = (coinRate) => {
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

  const handleShowRateType = (event, rateType) => {
    setRateType(rateType);
  };

  const handleShowCoinType = (event, coinType) => {
    setCoinType(coinType);
  };

  // const btcCoinLockedRate = topCoinsFixedRates.find((c) => c.title === "BTC");
  // const ethCoinLockedRate = topCoinsFixedRates.find((c) => c.title === "ETH");
  // const usdtCoinLockedRate = topCoinsFixedRates.find((c) => c.title === "USDT");
  // const usdcCoinLockedRate = topCoinsFixedRates.find((c) => c.title === "USDC");
  // const filteredLockedRates = topCoinsFixedRates.filter(
  //   (c) => !["BTC", "ETH", "USDC", "USDT"].includes(c.title)
  // );

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
          <Grid item xs={12} alignItems="flex-end">
            <ToggleButtonGroup
              value={rateType}
              exclusive
              color="primary"
              onChange={handleShowRateType}
              aria-label="rate type"
              style={{ paddingRight: 15, paddingBottom: 15 }}
            >
              <ToggleButton value="all" aria-label="all rates">
                All rates
              </ToggleButton>
              <ToggleButton value="flexible" aria-label="centered">
                Flexible rates
              </ToggleButton>
              <ToggleButton value="fixed" aria-label="right aligned">
                Fixed rates
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={coinType}
              color="secondary"
              exclusive
              onChange={handleShowCoinType}
              aria-label="coin type"
              style={{ paddingRight: 15, paddingBottom: 15}}
            >
              <ToggleButton value="top" aria-label="all rates">
                Top coins
              </ToggleButton>
              <ToggleButton value="other" aria-label="centered">
                Alternative coin
              </ToggleButton>
              <ToggleButton value="all" aria-label="right aligned">
                All coins
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {rateType === "all" && coinType === "top" &&
            topCoinsRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "all" && coinType === "other" &&
            otherCoinsRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "all" && coinType === "all" &&
            [...topCoinsRates, ...otherCoinsRates].map((coinRate) => ratesCard(coinRate))}
          {rateType === "flexible" && coinType === "top" &&
            topCoinsFlexRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "flexible" && coinType === "other" &&
            otherCoinsFlexRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "flexible" && coinType === "all" &&
            [...topCoinsFlexRates, ...otherCoinsFlexRates].map((coinRate) => ratesCard(coinRate))}
          {rateType === "fixed" && coinType === "top" &&
            topCoinsFixedRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "fixed" && coinType === "other" &&
            otherCoinsFixedRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "fixed" && coinType === "all" &&
            [...topCoinsFixedRates, ...otherCoinsFixedRates].map((coinRate) => ratesCard(coinRate))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
