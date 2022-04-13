import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import Container from "@mui/material/Container";
import { createCoin, deleteCoin } from "../graphql/mutations";
import { listCoins } from "../graphql/queries";


const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  coin: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  coinName: { fontSize: 20, fontWeight: "bold" },
  coinDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
  buttonDlt: {
    backgroundColor: "red",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

const initialState = { name: "", symbol: "", logoUrl: "" };

function CrudCoinForm({ user }) {
  const navigate = useNavigate();
  if (!user) {
    navigate("/signin", { replace: true });
  }
  const [formState, setFormState] = useState(initialState);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchCoins();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
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

  async function addCoin() {
    try {
      if (!formState.name || !formState.symbol || !formState.logoUrl) return;
      const coin = { ...formState, type: "TOP" };
      setCoins([...coins, coin]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createCoin, { input: coin }));
      
    } catch (error) {
      console.error("error creating coin:", error);
    }
  }

  const removeCoin = useCallback(
    (coinSymbol) => async () => {
      try {
        setFormState(initialState);
        await API.graphql(
          graphqlOperation(
            deleteCoin,
            { input: {symbol: coinSymbol } }
          )
        );
        await fetchCoins();
      } catch (error) {
        console.error("error creating coin:", error);
      }
    },
    [],
  );
  
  return (
    <>
      <Container maxWidth="xl" component="main">
        <div style={styles.container}>
          <h2>Add new Coin</h2>
          <input
            onChange={(event) => setInput("name", event.target.value)}
            style={styles.input}
            value={formState.name}
            placeholder="Name"
          />
          <input
            onChange={(event) => setInput("symbol", event.target.value)}
            style={styles.input}
            value={formState.symbol}
            placeholder="Symbol"
          />
          <input
            onChange={(event) => setInput("logoUrl", event.target.value)}
            style={styles.input}
            value={formState.logoUrl}
            placeholder="Logo URL"
          />
          <button style={styles.button} onClick={addCoin}>
            Create Coin
          </button>
          {coins.map((coin, index) => (
            <div key={index} style={styles.coin}>
              <p style={styles.coinName}>{coin.name}</p>
              <p style={styles.coinDescription}>{coin.symbol}</p>
              <p style={styles.coinDescription}>{coin.logoUrl}</p>
              <button style={styles.buttonDlt} onClick={removeCoin(coin.symbol)}>
                delete
              </button>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default CrudCoinForm;
