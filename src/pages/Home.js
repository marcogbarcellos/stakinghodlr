import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
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
import useAnalyticsEventTracker from "../actions/useAnalyticsEventTracker";
import SubscribeEmailForm from "../components/SubscribeEmailForm";

function Home() {
  const gaEventTracker = useAnalyticsEventTracker("Go to Coin Page");
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
    fetchTopCoinRates();
  }, []);

  const getFormattedCoinsMap = (rates) => {
    const sortedCoins = {};
    for (const rate of rates) {
      if (!sortedCoins[rate.coinSymbol]) {
        sortedCoins[rate.coinSymbol] = {};
      }
      sortedCoins[rate.coinSymbol].title = rate.coinSymbol;
      sortedCoins[rate.coinSymbol].name = rate.coin.name;
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

  async function fetchTopCoinRates() {
    try {
      let nextToken;
      let items = [];
      do {
        const rateData = await API.graphql(
          graphqlOperation(listCoinRates, {
            nextToken,
            filter: {
              or: [
                {coinSymbol: {eq: "BTC"}},
                {coinSymbol: {eq: "ETH"}},
                {coinSymbol: {eq: "USDT"}},
                {coinSymbol: {eq: "USDC"}},
                {coinSymbol: {eq: "LUNA"}},
                {coinSymbol: {eq: "SOL"}},
                {coinSymbol: {eq: "BNB"}},
                {coinSymbol: {eq: "ADA"}},
              ]
            }
          })
        );
        items = [...items, ...(rateData.data.listCoinRates.items || [])];
        const {
          topCoinsRates:topRates,
          topCoinsFlexRates: topFlex,
          topCoinsFixedRates: topFixed,
        } = extractFormattedCoinRates(items);
        setTopCoinsRates([...topCoinsRates, ...topRates]);
        setTopCoinsFlexRates([...topCoinsFlexRates, ...topFlex]);
        setTopCoinsFixedRates([...topCoinsFixedRates, ...topFixed]);
        nextToken = rateData.data.listCoinRates.nextToken;
      } while (nextToken);
      
    } catch (error) {
      console.error("error fetching coins", error);
    }
  }

  async function fetchOtherRates() {
    try {
      let nextToken;
      let items = [];
      do {
        const rateData = await API.graphql(
          graphqlOperation(listCoinRates, {
            nextToken,
            filter: {
              and: [
                {coinSymbol: {ne: "BTC"}},
                {coinSymbol: {ne: "ETH"}},
                {coinSymbol: {ne: "USDT"}},
                {coinSymbol: {ne: "USDC"}},
                {coinSymbol: {ne: "LUNA"}},
                {coinSymbol: {ne: "SOL"}},
                {coinSymbol: {ne: "BNB"}},
                {coinSymbol: {ne: "ADA"}},
              ]
            }
          })
        );
        items = [...items, ...(rateData.data.listCoinRates.items || [])];
        const {
          otherCoinsRates: otherRates,
          otherCoinsFlexRates: otherFlex,
          otherCoinsFixedRates: otherFixed,
        } = extractFormattedCoinRates(items);
        setOtherCoinsRates([...otherCoinsRates, ...otherRates]);
        setOtherCoinsFlexRates([...otherCoinsFlexRates, ...otherFlex]);
        setOtherCoinsFixedRates([...otherCoinsFixedRates, ...otherFixed]);
        nextToken = rateData.data.listCoinRates.nextToken;
      } while (nextToken);
      
    } catch (error) {
      console.error("error fetching coins", error);
    }
  }

  const ratesCard = (coinRate) => {
    return (
      <Grid item key={`${coinRate.title}-fixex`} xs={12} md={3}>
        <Card /* style={{ width: 360 }} */>
          {coinRate.logoUrl && (
            <CardMedia
              component="img"
              height="100"
              style={{ backgroundColor: "#fff", objectFit: "contain" }}
              image={coinRate.logoUrl}
              alt={`${coinRate.title}-fixed`}
            />
          )}
          <CardHeader
            title={
              <Grid
                container
                spacing={1}
                alignItems="baseline"
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="h5">{coinRate.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    (Up to {(coinRate.interestRate * 100).toFixed(2)}%)
                  </Typography>
                </Grid>
              </Grid>
            }
            titleTypographyProps={{ align: "center", variant: "h4" }}
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
              onClick={() => {
                // gaEventTracker('seeAllRates');
                ReactGA.event({
                  category: "Coins",
                  action: "See All Rates",
                });
                return navigate(`/coins/${coinRate.title}`, { replace: true });
              }}
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
    if (coinType === "other") {
      fetchOtherRates();
    }
  };

  return (
    <>
      <Container maxWidth="xl" component="main" sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} lg={9}>
            <Typography
              variant="h5"
              // align="center"
              style={{
                fontWeight: 900
              }}
              color="text.secondary"
              component="p"
            >
              Browse the best staking rates
              from one single place
            </Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <SubscribeEmailForm />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" component="main" >
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} lg={3} alignItems="flex-end">
            <ToggleButtonGroup
              value={rateType}
              exclusive
              color="primary"
              onChange={handleShowRateType}
              aria-label="rate type"
              size="small"
              fullWidth
            >
              <ToggleButton value="all" aria-label="all rates">
                All terms
              </ToggleButton>
              <ToggleButton value="flexible" aria-label="centered">
                Flex terms
              </ToggleButton>
              <ToggleButton value="fixed" aria-label="right aligned">
                Fixed terms
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} lg={3} alignItems="flex-end">
            <ToggleButtonGroup
              value={coinType}
              color="secondary"
              exclusive
              onChange={handleShowCoinType}
              aria-label="coin type"
              size="small"
              fullWidth
            >
              <ToggleButton
                value="top"
                aria-label="top coins"
                style={{ width: 120 }}
              >
                Top coins
              </ToggleButton>
              <ToggleButton
                value="other"
                aria-label="other coins"
                style={{ width: 120 }}
              >
                Other coins
              </ToggleButton>
              <ToggleButton
                value="all"
                aria-label="all coins"
                style={{ width: 120 }}
              >
                All coins
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} lg={6} alignItems="flex-end"></Grid>
          {rateType === "all" &&
            coinType === "top" &&
            topCoinsRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "all" &&
            coinType === "other" &&
            otherCoinsRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "all" &&
            coinType === "all" &&
            [...topCoinsRates, ...otherCoinsRates].map((coinRate) =>
              ratesCard(coinRate)
            )}
          {rateType === "flexible" &&
            coinType === "top" &&
            topCoinsFlexRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "flexible" &&
            coinType === "other" &&
            otherCoinsFlexRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "flexible" &&
            coinType === "all" &&
            [...topCoinsFlexRates, ...otherCoinsFlexRates].map((coinRate) =>
              ratesCard(coinRate)
            )}
          {rateType === "fixed" &&
            coinType === "top" &&
            topCoinsFixedRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "fixed" &&
            coinType === "other" &&
            otherCoinsFixedRates.map((coinRate) => ratesCard(coinRate))}
          {rateType === "fixed" &&
            coinType === "all" &&
            [...topCoinsFixedRates, ...otherCoinsFixedRates].map((coinRate) =>
              ratesCard(coinRate)
            )}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
