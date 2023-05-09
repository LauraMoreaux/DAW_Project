import React, { useState } from "react";
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
import firestore from "../../firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState({ value: false, message: undefined });
  const ref = collection(firestore, "users");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // form data
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    // firebase
    const q = query(ref, where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().password === data.get("password")) {
        setError({ value: false, message: undefined });
        setUser(doc.data());
      }
    });
    //handle error
    setError({ value: true, message: "Prueba con otro email o contraseña" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"}>
        <Typography component="h1" variant="h5">
          {!user ? "Login" : "Bienvenido " + user.email}
        </Typography>
        {!user ? (
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
              onChange={() => setError({ value: false, message: undefined })}
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
              onChange={() => setError({ value: false, message: undefined })}
            />
            <Snackbar open={error.value} autoHideDuration={500}>
              <Alert severity="error" sx={{ width: "100%" }}>
                {error.message}
              </Alert>
            </Snackbar>{" "}
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
        ) : (
          <Link to={"/"}>
            <Button variant={"contained"}>Mira tus posibles match</Button>
          </Link>
        )}
      </Stack>
    </Container>
  );
};

export default Login;
