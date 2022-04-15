import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { API, graphqlOperation } from "aws-amplify";
import { createMailList } from "../graphql/mutations";

export default function SubscribeEmailForm() {
  const [successfulSubscription, setSuccessfulSubscription] =
    React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [email, setEmail] = React.useState("");

  //   const handleEmailChange =
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      return false;
    }
    return true;
  };

  const handleSubscribe = async () => {
    if (emailValidation()) {
      try {
        await API.graphql(graphqlOperation(createMailList, { input: {email} }));
        setSuccessfulSubscription(true);
        setEmail("");
        setTimeout(() => {
          setSuccessfulSubscription(false);
        }, 4000);
      } catch (error) {
        console.error("error subscribing email", error);
        if (error.errors && error.errors.length > 0 && error.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException") {
          setErrorMessage("Email was already inserted!");
          setInvalidEmail(true);
          setTimeout(() => {
            setInvalidEmail(false);
          }, 4000);
        }
      }
      return;
    }
    setErrorMessage("Email is not valid!");
    setInvalidEmail(true);
    setTimeout(() => {
      setInvalidEmail(false);
    }, 4000);
      
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", maxWidth: "100%" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="receive weekly emails"
          inputProps={{ "aria-label": "enter email for weekly updates" }}
          onChange={handleEmailChange}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            handleSubscribe();
          }}
        >
          Subscribe
        </Button>
      </Paper>
      {successfulSubscription && (
        <Alert
          action={
            <IconButton aria-label="close" color="inherit" size="small" />
          }
          sx={{ mb: 2, mt: 2, maxWidth: 400 }}
        >
          Thanks, you were Successfully subscribed!
        </Alert>
      )}
      {invalidEmail && (
        <Alert
          // action={
          //   <IconButton aria-label="close" color="inherit" size="small" />
          // }
          severity="error"
          sx={{ mb: 2, mt: 2, maxWidth: 400 }}
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
