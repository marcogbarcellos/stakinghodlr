import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Authenticator } from "@aws-amplify/ui-react";
import CrudCoinForm from "../components/CrudCoinForm";
import CrudExchangeForm from "../components/CrudExchangeForm";
import CrudCoinRatesForm from "../components/CrudCoinRatesForm";

function SigninContent() {
  const [value, setValue] = React.useState("coins");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Container maxWidth="xl" component="main">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Authenticator hideSignUp>
              {({ signOut, user }) => (
                <>
                  <Grid container spacing={3} alignItems="flex-end" mt={5}>
                    <Grid item key="signout-button" xs={6}>
                      <Button variant="contained" onClick={signOut}>
                        Sign out
                      </Button>
                    </Grid>
                    <Grid item key="radio-button" xs={6}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Management
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={handleRadioChange}
                          defaultValue="coins"
                        >
                          <FormControlLabel
                            value="coins"
                            control={<Radio />}
                            label="Coins"
                          />
                          <FormControlLabel
                            value="exchanges"
                            control={<Radio />}
                            label="Exchanges"
                          />
                          <FormControlLabel
                            value="coinRates"
                            control={<Radio />}
                            label="Coin Rates"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {value === "coins" && (
                      <Grid item key="coin-form" xs={12}>
                        <CrudCoinForm user={user} />
                      </Grid>
                    )}
                    {value === "exchanges" && (
                      <Grid item key="coin-form" xs={12}>
                        <CrudExchangeForm user={user} />
                      </Grid>
                    )}
                    {value === "coinRates" && (
                      <Grid item key="coin-form" xs={12}>
                        <CrudCoinRatesForm user={user} />
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
            </Authenticator>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default function Signin() {
  return <SigninContent />;
}
