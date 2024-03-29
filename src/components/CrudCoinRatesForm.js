import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { listExchanges } from "../graphql/queries";
import { listCoins } from "../graphql/queries";
import { listCoinRates } from "../graphql/queries";
import { createCoinRate, updateCoinRate } from "../graphql/mutations";
import { createHistoryCoinRate } from "../graphql/mutations";
import { deleteCoinRate } from "../graphql/mutations";

function CrudCoinRatesForm({ user }) {
  const navigate = useNavigate();
  if (!user) {
    navigate("/signin", { replace: true });
  }
  const datagridColumns = [
    { field: "date", headerName: "Date", width: 250 },
    { field: "coinSymbol", headerName: "Coin", width: 150 },
    { field: "exchangeName", headerName: "Exchange", width: 150 },
    { field: "interestRate", headerName: "Interest Rate", width: 150 },
    { field: "lockDays", headerName: "Lock Days", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: rate => (
        <>
          <Button
            style={{
              backgroundColor: "#e8605d",
              padding: "3px 35px",
            }}
            onClick={removeCoinRate(rate)}
            variant="contained"
            color="primary"
            type="submit"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  const [exchanges, setExchanges] = useState([]);
  const [coins, setCoins] = useState([]);
  const [coinRates, setCoinRates] = useState([]);
  const [coin, setCoin] = useState("");
  const [rate, setRate] = useState(null);
  const [lockDays, setLockDays] = useState(undefined);
  const [exchange, setExchange] = useState("");

  useEffect(() => {
    fetchExchanges();
    fetchCoins();
    fetchCoinRates();
  }, []);

  const handleChangeCoin = (event) => {
    setCoin(event.target.value);
  };
  const handleChangeExchange = (event) => {
    setExchange(event.target.value);
  };

  const handleChangeRate = (event) => {
    setRate(event.target.value);
  };

  const handleChangeLockDays = (event) => {
    const lockDays = parseInt(event.target.value);
    if (!lockDays || lockDays <= 0) {
      setLockDays(undefined);
      return;
    }
    setLockDays(lockDays);
  };

  const handleSubmit = async () => {
    const coinNameExchangeName = `COIN#${coin}#EXCHANGE#${exchange}#LOCK_DAYS#${lockDays > 0 ? lockDays : 0}`;
    const oldCoinRate = coinRates.find(coinRate => coinRate.coinNameExchangeName === coinNameExchangeName);
    const coinRate = {
      coinNameExchangeName,
      date: new Date().toISOString(),
      coinSymbol: coin,
      exchangeName: exchange,
      interestRate: (Number(rate) / 100).toFixed(6),
      lockDays,
      origin: "manual_insertion",
    };
    try {
      if (oldCoinRate) {
        await API.graphql(graphqlOperation(updateCoinRate, { input: coinRate }));
        const historyRate = {
          coinNameExchangeName: oldCoinRate.coinNameExchangeName,
          date: oldCoinRate.date,
          coinSymbol: oldCoinRate.coinSymbol,
          exchangeName: oldCoinRate.exchangeName,
          interestRate: oldCoinRate.interestRate,
          lockDays: oldCoinRate.lockDays,
          origin: oldCoinRate.origin,
        };
        await API.graphql(graphqlOperation(createHistoryCoinRate, { input: historyRate }));
      } else {
        await API.graphql(graphqlOperation(createCoinRate, { input: coinRate }));
      }
      await fetchCoinRates();
      // cleanup form
      // setCoin("");
      // setExchange("");
      // setRate(null);
      // setLockDays(undefined);
    } catch (error) {
      console.error("error creating coin rate:", error);
    }
  };

  async function fetchExchanges() {
    try {
      const exchangeData = await API.graphql(graphqlOperation(listExchanges));
      const exchanges = exchangeData.data.listExchanges.items;
      exchanges.sort((a, b) => a.name.localeCompare(b.name));
      setExchanges(exchanges);
    } catch (error) {
      console.error("error fetching exchanges", error);
    }
  }

  async function fetchCoins() {
    try {
      const coinData = await API.graphql(graphqlOperation(listCoins));
      const coins = coinData.data.listCoins.items;
      coins.sort((a, b) => a.symbol.localeCompare(b.symbol));
      setCoins(coins);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  }
  async function fetchCoinRates() {
    try {
      const rateData = await API.graphql(graphqlOperation(listCoinRates));
      const rates = rateData.data.listCoinRates.items;
      setCoinRates(rates);
    } catch (error) {
      console.error("error fetching coin rates", error);
      if (error.data.listCoinRates.items) {
        const rates = error.data.listCoinRates.items.filter(i => i !== null);
        setCoinRates(rates);
      }
    }
  }

  const removeCoinRate = useCallback(
    item => async () => {
      try {
        const deletingCoinRate = item.row;
        await API.graphql(
          graphqlOperation(deleteCoinRate, { input: { coinNameExchangeName: deletingCoinRate.coinNameExchangeName, date: deletingCoinRate.date } })
        );
        await fetchCoinRates();
      } catch (error) {
        console.error("error deleting coin:", error);
      }
    },
    []
  );

  return (
    <>
      <Container maxWidth="xl" component="main">
          <Grid container spacing={3} alignItems="flex-end" mt={5}>
            <Grid item key="coins-grid-title" xs={12}>
              <Typography variant="h5">Add new coin rates</Typography>
            </Grid>
            <Grid item key="coins-grid-form-coin" xs={12}>
              <FormControl fullWidth>
                <InputLabel id="coins-select-label">Coin</InputLabel>
                <Select
                  labelId="coins-select-label"
                  id="coins-select"
                  value={coin}
                  label="Coin"
                  onChange={handleChangeCoin}
                >
                  {coins.map((coin) => (
                    <MenuItem value={coin.symbol}>{coin.symbol}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item key="coins-grid-form-exchange" xs={12}>
              <FormControl fullWidth>
                <InputLabel id="coins-select-label">Exchange</InputLabel>
                <Select
                  labelId="coins-select-label"
                  id="coins-select"
                  value={exchange}
                  label="Exchange"
                  onChange={handleChangeExchange}
                >
                  {exchanges.map((exchange) => (
                    <MenuItem value={exchange.name}>{exchange.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item key="coins-grid-form-rate" xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-rates"
                  label="Interest Rate (in %)"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 5,
                    step: "0.01",
                  }}
                  value={rate}
                  onChange={handleChangeRate}
                />
              </FormControl>
            </Grid>
            <Grid item key="coins-grid-form-lock-days" xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-lock-days"
                  label="Lock days"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 5,
                    step: "1",
                  }}
                  value={lockDays}
                  onChange={handleChangeLockDays}
                />
              </FormControl>
            </Grid>
            <Grid item key="coins-grid-form-butn" xs={12}>
              <Button variant="contained" onClick={handleSubmit}>
                Create
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end" mt={5}>
            <Grid item key="coins-grid-list" xs={12}>
              <div style={{ height: 1500, width: "100%" }}>
                <DataGrid
                  rows={coinRates.map((rate, index) => ({
                    ...rate,
                    interestRate: `${(rate.interestRate * 100).toFixed(2)}%`,
                    id: index,
                  }))}
                  // sortModel={[
                  //   {field: "date", sort: "desc"},
                  //   {field: "date", sort: "asc"},
                  //   {field: "exchangeName", sort: "desc"},
                  //   {field: "exchangeName", sort: "asc"},
                  // ]}
                  columns={datagridColumns}
                  pageSize={50}
                  rowsPerPageOptions={[50]}
                />
              </div>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}

export default CrudCoinRatesForm;
