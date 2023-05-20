import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useProfiles from "../hooks/useProfiles";
import { Chip, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function CarouselCards() {
  const { mentors } = useProfiles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = mentors.length;

  console.log("carousel", mentors);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (mentors.length < 1) {
    return (
      <Typography variant={"caption"}>
        Sé paciente por favor, estamos cargando los perfiles
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <SwipeableViews index={activeStep}>
        {mentors.map((step, index) => {
          console.log("step", step.tecnologies);
          return (
            <Stack
              flex={1}
              alignItems={"center"}
              spacing={2}
              key={step.email + index}
            >
              <AccountCircleIcon />
              <Typography variant={"body2"}>{step?.firstName}</Typography>
              <Typography variant={"caption"}>{step?.description}</Typography>
              {!!step?.tecnologies &&
                step.tecnologies.map((x) => (
                  <Chip label={x} color="primary" variant="outlined" />
                ))}
            </Stack>
          );
        })}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Button variant={"outlined"} sx={{ mt: 4 }}>
        <Typography>Haz match</Typography>
        <FavoriteIcon sx={{ ml: 2 }} />
      </Button>
    </Box>
  );
}

export default CarouselCards;
