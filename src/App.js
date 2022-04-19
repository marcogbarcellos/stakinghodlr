import { Routes, Route, useNavigate } from "react-router-dom";
import ReactGA from "react-ga";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import TwitterIcon from "@mui/icons-material/Twitter";
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
    description: [{ label: "Terms of use", page: "/terms" }],
  },
  {
    title: "Social",
    description: [
      {
        label: "Follow us on twitter",
        link: "https://twitter.com/stakinghodlr",
        icon: TwitterIcon,
      },
    ],
  },
];

const BasePage = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyles
        styles={{
          ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
            fontFamily:
              "Inter, -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Helvetica, Arial, sans-serif",
          },
        }}
      />
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#04053e" }}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon /> 
            </IconButton>*/}
            <Link
              color="inherit"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <Image
                edge="start"
                src="https://stakinghodlr.s3.amazonaws.com/app_imgs/stakinghodlr.png"
                height={70}
                width={250}
              />
            </Link>
            <Link
              color="inherit"
              onClick={() =>
                window.open("https://twitter.com/stakinghodlr", "_blank") ||
                window.location.replace("https://twitter.com/stakinghodlr")
              }
              style={{ cursor: "pointer" }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="twitter"
                sx={{ mr: 2 }}
                spacing={3}
              >
                <TwitterIcon />
              </IconButton>
            </Link>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Box sx={{ flexGrow: 1 }}>
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
            <Image
              edge="start"
              src="https://stakinghodlr.s3.amazonaws.com/app_imgs/stakinghodlr.png"
              height={70}
              width={250}
            />
          </Link>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 0 }}
          >asdsa</Typography>
        </Toolbar>
      </AppBar>
      </Box> */}
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
                    <Link
                      onClick={() => {
                        if (item.page) {
                          navigate(item.page);
                        }
                        if (item.link) {
                          window.open(item.link, "_blank") ||
                            window.location.replace(item.link);
                        }
                      }}
                      variant="subtitle1"
                      color="text.secondary"
                      style={{ cursor: "pointer" }}
                    >
                      <Grid container spacing={1}>
                        {item.icon && (
                          <Grid item>
                            <item.icon />
                          </Grid>
                        )}
                        <Grid item>
                          <Typography>{item.label}</Typography>
                        </Grid>
                      </Grid>
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
