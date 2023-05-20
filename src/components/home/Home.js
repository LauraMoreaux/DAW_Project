import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  List,
  ListItem,
  Stack,
  Container,
  CircularProgress,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CarouselCards from "../carousel/CarouselCards";
import { AuthContext } from "../../context/auth-context";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Home = () => {
  const { state } = useContext(AuthContext);
  const { loggedUser, isLoginPending } = state;
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
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
      <Stack className={"main-div"} spacing={4}>
        {!!loggedUser ? (
          <>
            <Typography component="h1" variant="h5">
              Encuentra a tu mentor/mentorizado:
            </Typography>
            <CarouselCards />
          </>
        ) : (
          <>
            <Typography>
              Bienvenido a nuestra web para encontrar mentores o mentorizados y
              realizar en conjunto el proyecto de tu FP
            </Typography>
            <Typography>Las ventajas de usar esta web son:</Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tab} onChange={handleChange}>
                <Tab label="Quiero ser mentorizado" {...a11yProps(0)} />
                <Tab label="Quiero ser mentor" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <List>
                <ListItem>Es gratuito</ListItem>
                <ListItem>Tu mentor es un profesional</ListItem>
              </List>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <List>
                <ListItem>Es gratuito</ListItem>
                <ListItem>
                  Podrás poner en práctica tus dotes como senior
                </ListItem>
              </List>
            </TabPanel>
            <Link to={"/registration"}>
              <Button variant={"outlined"}>Regístrate</Button>
            </Link>
            <Link to={"/login"}>
              <Button variant={"contained"}>Login</Button>
            </Link>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
