import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, List, ListItem, Stack, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    //
    <Container component="main" maxWidth="xs">
      <Stack className={"main-div"} spacing={4}>
        <Typography>
          Bienvenido a nuestra web para encontrar mentores o mentorizados y
          realizar en conjunto el proyecto de tu FP
        </Typography>
        <Typography>Las ventajas de usar esta web son:</Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Quiero ser mentorizado" {...a11yProps(0)} />
            <Tab label="Quiero ser mentor" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <List>
            <ListItem>Es gratuito</ListItem>
            <ListItem>Tu mentor es un profesional</ListItem>
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List>
            <ListItem>Es gratuito</ListItem>
            <ListItem>Podrás poner en práctica tus dotes como senior</ListItem>
          </List>
        </TabPanel>
        <Link to={"/registration"}>
          <Button variant={"outlined"}>Regístrate</Button>
        </Link>
        <Link to={"/login"}>
          <Button variant={"contained"}>Login</Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default Home;
