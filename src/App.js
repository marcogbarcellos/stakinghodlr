import { Routes, Route, useNavigate } from "react-router-dom";
import ReactGA from 'react-ga';
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "mui-image";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Signin from "./pages/Signin";
import TermsOfUse from "./pages/TermsOfUse";
// import { useEffect } from "react";
ReactGA.initialize("UA-226006942-2");
ReactGA.pageview(window.location.pathname + window.location.search);

function Copyright(props) {
  const navigate = useNavigate();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        StakingHodlr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Legal",
    description: [{label: "Terms of use", page: "/terms"}],
  },
];

const BasePage = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Helvetica, Arial, sans-serif" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap", backgroundColor: "#04053e" }}>
          <Link
              color="inherit"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
            <Image src="https://stakinghodlr.s3.amazonaws.com/app_imgs/stakinghodlr.png" height={70} width={250} />
          </Link>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link onClick={() => navigate(item.page)} variant="subtitle1" color="text.secondary" style={{ cursor: "pointer" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </>
  );
};
const App = () => {
  
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <BasePage>
              <Home />
            </BasePage>
          }
        />
        <Route
          path="home"
          element={
            <BasePage>
              <Home />
            </BasePage>
          }
        />
        <Route
          path="coins/:symbol"
          forceRefresh={true}
          element={
            <BasePage>
              <Coin />
            </BasePage>
          }
        />
        <Route
          path="signin"
          element={
            <BasePage>
              <Signin />
            </BasePage>
          }
        />
        <Route
          path="terms"
          element={
            <BasePage>
              <TermsOfUse />
            </BasePage>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default App;
