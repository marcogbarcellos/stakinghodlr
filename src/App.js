import { Routes, Route } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Signin from "./pages/Signin";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://stakinghodlr.com/">
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
    description: ["Disclaimer", "Terms of use"],
  },
];

const BasePage = ({ children }) => {
  return (
    <>
    <GlobalStyles
      styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
    />
    <CssBaseline />
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap", backgroundColor: "#fff" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link color="inherit" href="https://stakinghodlr.com/">
            StakingHodlr
          </Link>
        </Typography>
        {/* <nav>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Features
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Enterprise
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Support
          </Link>
        </nav>
        <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button> */}
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
                  <Link href="#" variant="subtitle1" color="text.secondary">
                    {item}
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
  return (
    <>
      <Routes>
        <Route index element={<BasePage><Home /></BasePage> } />
        <Route path="home" element={<BasePage><Home /></BasePage> } />
        <Route path="coins/:symbol" forceRefresh={true} element={<BasePage><Coin /></BasePage> } />
        <Route path="signin" element={<BasePage><Signin /></BasePage> } />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};


export default App;

