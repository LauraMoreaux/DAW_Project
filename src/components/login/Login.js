import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  Container,
  TextField,
  Grid,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/auth-context";

const Login = () => {
  const { state, login } = useContext(AuthContext);
  const { loggedUser, loginError } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // form data
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    //fetch login
    login(userEmail, userPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"} spacing={6}>
        <Typography component="h1" variant="h5">
          {!!loggedUser ? "Bienvenido " + loggedUser : "Login"}
        </Typography>
        {!!loggedUser ? (
          <Link to={"/"}>
            <Button variant={"contained"}>Mira tus posibles match</Button>
          </Link>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Snackbar open={!!loginError} autoHideDuration={200}>
              <Alert severity="error" sx={{ width: "100%" }}>
                {loginError?.message}
              </Alert>
            </Snackbar>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/registration"}>No tienes cuenta? Regístrate</Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Login;
