import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Container,
  Stack,
  TextField,
  Grid,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import TextFieldLanguages from "../textField/TextFieldLanguages";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import firestore from "../../firebase";
import { AuthContext } from "../../context/auth-context";

const MyAccount = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { loggedUser } = state;
  const [disableButton, setDisabledButton] = useState(true);
  const [error, setError] = useState({ value: false, message: null });
  const [technologies, setTechnologies] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //form data
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data);

    // firebase
    const userIDStoraged = JSON.parse(localStorage.getItem("userID"));
    const docRef = doc(firestore, "users", userIDStoraged);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await updateDoc(docRef, {
        ...formValues,
        technologies: technologies,
      });
      setDisabledButton(false);
    } else {
      setError({
        value: true,
        message: "Ups! Ha habido un error, inténtelo en unos minutos",
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"} spacing={3}>
        <Typography component="h1" variant="h5">
          Mi cuenta
        </Typography>
        <Typography component="h4" variant="body1">
          Edita tus preferencias para que podamos enseñarte en el carousel solo
          los perfiles que más se adapten a ti.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                value={loggedUser}
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
                id="description"
                name="description"
              />
            </Grid>
            <TextFieldLanguages setTechnologies={setTechnologies} />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!disableButton}
          >
            Guardar datos
          </Button>
          <Grid container justifyContent={"center"} my={3}>
            <Grid item>
              <Typography
                component="h5"
                variant="h6"
                color={disableButton ? "grey" : "initial"}
              >
                ¿Todo listo?
              </Typography>
            </Grid>
          </Grid>
          <Button variant={"contained"} onClick={() => navigate("/")}>
            Mira tus posibles match
          </Button>
        </Box>
        <Snackbar open={error.value} autoHideDuration={300}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {error.message}
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
};

export default MyAccount;
