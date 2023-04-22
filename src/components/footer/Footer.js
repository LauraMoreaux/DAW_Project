import React from "react";
import Typography from "@mui/material/Typography";
import { Divider, Box, Container, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Divider />
        <Grid container direction="column" alignItems="center" mt={3}>
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Mentor Match Web App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
