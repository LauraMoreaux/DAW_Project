import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Container, Stack, TextField, Grid, Box, Button } from "@mui/material";
import TextFieldLanguages from "../textField/TextFieldLanguages";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import firestore from "../../firebase";

const MyAccount = () => {
  const navigate = useNavigate();
  const ref = collection(firestore, "users");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //form data
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data);
    console.log(formValues);
    // firebase
    /*    const newUser = await addDoc(ref, "");
    if (newUser.id) {
      console.log(newUser.id);
      navigate("/my-account");
    }*/
  };
  return (
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"}>
        <Typography component="h1" variant="h5">
          Mi cuenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                value={"El email de bbdd"}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} textAlign={"left"}>
              <Typography component="h5" variant="body1">
                ¿Qué quieres que sepan de ti?
              </Typography>
              <TextareaAutosize
                minRows={3}
                maxRows={7}
                className={"text-area-width"}
              />
            </Grid>
            <TextFieldLanguages />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Guardar datos
          </Button>
          <Grid container justifyContent={"center"} my={3}>
            <Grid item>
              <Typography component="h5" variant="h6">
                ¿Todo listo?
              </Typography>
            </Grid>
          </Grid>
          <Link to={"/"}>
            <Button variant={"contained"}>Mira tus posibles match</Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};

export default MyAccount;
