import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  Container,
  TextField,
  Grid,
  FormControlLabel,
  Stack,
  RadioGroup,
  Radio,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { addDoc, collection } from "@firebase/firestore";
import firestore from "../../firebase";
import { AuthContext } from "../../context/auth-context";

const Registration = () => {
  const navigate = useNavigate();
  const { state, login } = useContext(AuthContext);
  const { loggedUser, isLoginPending } = state;
  const ref = collection(firestore, "users");

  //handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    //form data
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data);
    const formattedData = {
      ...formValues,
      mentor: data.get("mentor") === "mentor",
    };
    // firebase
    const newUser = await addDoc(ref, formattedData);
    if (newUser.id) {
      login(data.get("email"), data.get("password"));
      navigate("/my-account");
    }
  };
  if (isLoginPending) {
    return (
      <Container component="main">
        <Stack className={"main-div"} display={"flex"} alignItems={"center"}>
          <CircularProgress />
        </Stack>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!!loggedUser ? (
            <>
              Ya has hecho login con una cuenta registrada, disfruta YA de las
              ventajas clicando<Link to="/"> aquí </Link>
            </>
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ¡Regístrate!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="mentorizado"
                        name="mentor"
                        sx={{ flexDirection: "row" }}
                      >
                        <FormControlLabel
                          value="mentor"
                          control={<Radio />}
                          label="Mentor"
                        />
                        <FormControlLabel
                          value="mentorizado"
                          control={<Radio />}
                          label="Mentorizado"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={"/login"}>¿Ya tienes cuenta?</Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Registration;
