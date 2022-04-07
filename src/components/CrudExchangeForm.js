import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import Container from "@mui/material/Container";
import { createExchange, deleteExchange } from "../graphql/mutations";
import { listExchanges } from "../graphql/queries";

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  exchange: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  exchangeName: { fontSize: 20, fontWeight: "bold" },
  exchangeDescription: { marginBottom: 0 },
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

const initialState = { name: "", logoUrl: "" };

function CrudExchangeForm({ user }) {
  const navigate = useNavigate();
  if (!user) {
    navigate("/signin", { replace: true });
  }
  const [formState, setFormState] = useState(initialState);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    fetchExchanges();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  
  async function fetchExchanges() {
    try {
      const exchangeData = await API.graphql(graphqlOperation(listExchanges));
      const exchanges = exchangeData.data.listExchanges.items;
      setExchanges(exchanges);
    } catch (error) {
      console.error("error fetching exchanges", error);
    }
  }

  async function addExchange() {
    try {
      if (!formState.name || !formState.logoUrl) return;
      const exchange = { ...formState };
      setExchanges([...exchanges, exchange]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createExchange, { input: exchange }));
    } catch (error) {
      console.error("error creating exchange:", error);
    }
  }

  const removeExchange = useCallback(
    (name) => async () => {
      try {
        setFormState(initialState);
        await API.graphql(
          graphqlOperation(
            deleteExchange,
            { input: { name } }
          )
        );
        await fetchExchanges();
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
          <h2>Add new Exchange</h2>
          <input
            onChange={(event) => setInput("name", event.target.value)}
            style={styles.input}
            value={formState.name}
            placeholder="Name"
          />
          <input
            onChange={(event) => setInput("logoUrl", event.target.value)}
            style={styles.input}
            value={formState.logoUrl}
            placeholder="Logo URL"
          />
          <button style={styles.button} onClick={addExchange}>
            Create Exchange
          </button>
          {exchanges.map((exchange, index) => (
            <div key={exchange.id ? exchange.id : index} style={styles.exchange}>
              <p style={styles.exchangeName}>{exchange.name}</p>
              <p style={styles.exchangeDescription}>{exchange.logoUrl}</p>
              <button style={styles.buttonDlt} onClick={removeExchange(exchange.name)}>
                delete
              </button>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default CrudExchangeForm;
