import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  Container,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import firestore from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";

const Login = () => {
  const ref = collection(firestore, "messages");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    let firebaseData = {
      message: data.get("email"),
    };

    try {
      addDoc(ref, firebaseData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          />
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
      </Stack>
    </Container>
  );
};

export default Login;
