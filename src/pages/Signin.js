import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Container from "@mui/material/Container";
import { Authenticator } from "@aws-amplify/ui-react";
import { createCoin } from "../graphql/mutations";
import { listCoins } from "../graphql/queries";

const initialState = { name: "", symbol: "", logoUrl: "" };

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
};

function SigninContent() {
  const [formState, setFormState] = useState(initialState);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchCoins();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  console.log(formState);
  async function fetchCoins() {
    try {
      const coinData = await API.graphql(graphqlOperation(listCoins));
      console.log(coinData);
      const coins = coinData.data.listCoins.items;
      setCoins(coins);
    } catch (err) {
      console.log("error fetching coins");
    }
  }

  async function addCoin() {
    console.log("add coin");
    try {
      if (!formState.name || !formState.symbol || !formState.logoUrl) return;
      const coin = { ...formState };
      setCoins([...coins, coin]);
      setFormState(initialState);
      console.log({ input: coin });
      await API.graphql(graphqlOperation(createCoin, { input: coin }));
    } catch (err) {
      console.log("error creating coin:", err);
    }
  }

  return (
    <>
      <Container maxWidth="xl" component="main">
        <Authenticator>
          {({ signOut /* , user */ }) => (
            <div style={styles.container}>
              <button style={styles.button} onClick={signOut}>
                Sign out
              </button>
              <h2>Cryptocurrencies</h2>
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
                <div key={coin.id ? coin.id : index} style={styles.coin}>
                  <p style={styles.coinName}>{coin.name}</p>
                  <p style={styles.coinDescription}>{coin.symbol}</p>
                  <p style={styles.coinDescription}>{coin.logoUrl}</p>
                </div>
              ))}
            </div>
          )}
        </Authenticator>
      </Container>
    </>
  );
}

export default function Signin() {
  return <SigninContent />;
}
