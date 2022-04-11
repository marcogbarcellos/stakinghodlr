import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";
import { API, graphqlOperation } from "aws-amplify";
import { useParams } from "react-router-dom";
import { listCoins } from "../graphql/queries";

const getCoinGraphqlQuery = /* GraphQL */ `
  query GetCoin($symbol: String!) {
    getCoin(symbol: $symbol) {
      symbol
      name
      logoUrl
      coinRates {
        items {
          coinNameExchangeName
          date
          coinSymbol
          exchangeName
          exchange {
            logoUrl
            earnUrl
          }
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

function Coin() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState({});
  const [flexRates, setFlexRates] = useState([]);
  const [fixedRates, setFixedRates] = useState([]);
  const [coins, setCoins] = useState([]);
  console.log(coin);
  const flexDatagridColumns = [
    {
      field: "exchangeInfo",
      headerName: "Exchange",
      width: 200,
      renderCell: (params) => (
        <>
          <Avatar
            style={{
              cursor: "pointer",
            }}
            alt={params.value.exchange}
            src={params.value.logoUrl}
            onClick={() => window.open(params.value.earnUrl, "_blank")}
          />
          <Typography
            ml={2}
            onClick={() => window.open(params.value.earnUrl, "_blank")}
            style={{
              cursor: "pointer",
            }}
          >
            {params.value.exchange}
          </Typography>
        </>
      ),
    },
    { field: "interestRate", headerName: "Interest Rate", width: 150 },
  ];
  const fixedDatagridColumns = [
    {
      field: "exchangeInfo",
      headerName: "Exchange",
      width: 200,
      renderCell: (params) => (
        <>
          <Avatar
            style={{
              cursor: "pointer",
            }}
            alt={params.value.exchange}
            src={params.value.logoUrl}
            onClick={() => window.open(params.value.earnUrl, "_blank")}
          />
          <Typography
            ml={2}
            onClick={() => window.open(params.value.earnUrl, "_blank")}
            style={{
              cursor: "pointer",
            }}
          >
            {params.value.exchange}
          </Typography>
        </>
      ),
    },
    { field: "interestRate", headerName: "Interest Rate", width: 150 },
    {
      field: "lockDays",
      headerName: "Duration",
      width: 150,
      valueGetter: ({ value }) => `${value} days`,
    },
  ];

  useEffect(() => {
    fetchCoin();
    fetchCoins();
  }, []);

  const setCoinAttributes = (coin) => {
    const flexRates = [];
    const fixedRates = [];
    for (const rate of coin.coinRates.items) {
      const insertingRate = {
        exchange: rate.exchangeName,
        logoUrl: rate.exchange.logoUrl,
        earnUrl: rate.exchange.earnUrl,
        interestRate: rate.interestRate,
        lockDays: rate.lockDays,
      };
      if (rate.lockDays > 0) {
        fixedRates.push(insertingRate);
      } else {
        flexRates.push(insertingRate);
      }
    }
    flexRates.sort((a,b) => b.interestRate - a.interestRate);
    fixedRates.sort((a,b) => b.interestRate - a.interestRate);
    setFlexRates(flexRates);
    setFixedRates(fixedRates);
    setCoin(coin);
  };
  console.log(flexRates)
  async function fetchCoin() {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(sevenDaysAgo.getHours() - 24 * 7);
      console.log(`finding coin with Symbol: ${symbol}`);
      const coinData = await API.graphql(
        graphqlOperation(getCoinGraphqlQuery, { symbol })
        );
        
      console.log(`finding coin data:`, coinData);
      setCoinAttributes(coinData.data.getCoin);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  }

  async function fetchCoins() {
    try {
      const coinData = await API.graphql(graphqlOperation(listCoins));
      const coins = coinData.data.listCoins.items;
      setCoins(coins);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  }

  if (!coin || !coin.name) {
    return (
      <>
        <Container
          disableGutters
          maxWidth="xl"
          component="main"
          sx={{ pt: 8, pb: 6 }}
        >
          {/* <Grid item key={`${coin.name}-notfound`} xs={12} md={6} lg={4}>
            <Typography variant="h2" color="text.secondary" align="center">
              No Coin was found. =(
            </Typography>
          </Grid> */}
        </Container>
      </>
    );
  }
  return (
    <>
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ pt: 8, pb: 6, pl: 5 }}
      >
        <Grid
          container
          spacing={5}
        >
          <Grid item key={`${coin.name}-main-flex`} xs={12} lg={3}>
            <Select
              value={coin.symbol}
              style={{width: "90%"}}
              onChange={event => {
                navigate(`/coins/${event.target.value}`);
                navigate(0);
              }}
            >
              {
                coins.map(coin => 
                  <MenuItem value={coin.symbol}>
                    <Grid
                      container
                      spacing={5}
                    >
                      <Grid item key={`${coin.name}-flex`}>
                        <Avatar
                          style={{
                            cursor: "pointer",
                          }}
                          alt={coin.symbol}
                          src={coin.logoUrl}
                        />
                      </Grid>
                      <Grid item key={`${coin.name}-symb-flex`}>
                        <Typography
                          variant="h5"
                        >{coin.symbol}</Typography>
                      </Grid>
                    </Grid>
                </MenuItem>
                )
              }
            </Select>
          </Grid>
          <Grid item container key={`grids`} spacing={3} xs={12}>
            <Grid item key={`grid-fixed`}>
              {fixedRates.length > 0 && (
                <>
                  <Typography variant="h5">Flexible Term</Typography>
                  <div style={{ height: 500, width: 350 }}>
                    <DataGrid
                      rows={flexRates.map((rate, index) => ({
                        ...rate,
                        exchangeInfo: {
                          logoUrl: rate.logoUrl,
                          earnUrl: rate.earnUrl,
                          exchange: rate.exchange,
                        },
                        interestRate: `${(rate.interestRate * 100).toFixed(
                          2
                        )}%`,
                        id: index,
                      }))}
                      columns={flexDatagridColumns}
                      pageSize={20}
                      rowsPerPageOptions={[20]}
                    />
                  </div>
                </>
              )}
            </Grid>
            <Grid item key={`grid-flex`}>
              {fixedRates.length > 0 && (
                <>
                  <Typography variant="h5">Fixed Term</Typography>
                  <div style={{ height: 500, width: 500 }}>
                    <DataGrid
                      rows={fixedRates.map((rate, index) => ({
                        ...rate,
                        exchangeInfo: {
                          logoUrl: rate.logoUrl,
                          earnUrl: rate.earnUrl,
                          exchange: rate.exchange,
                        },
                        interestRate: `${(rate.interestRate * 100).toFixed(
                          2
                        )}%`,
                        id: index,
                      }))}
                      columns={fixedDatagridColumns}
                      pageSize={20}
                      rowsPerPageOptions={[20]}
                    />
                  </div>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Coin;
