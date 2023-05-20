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
  const { profiles } = useProfiles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = profiles.length;
  const mailCopy = profiles[activeStep]?.mentor;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const MailTo = ({ children }) => {
    return (
      <a
        href={`mailto:${
          profiles[activeStep].email
        }?subject=${encodeURIComponent(
          "¡Hola! Quiero ponerme en contacto contigo desde Mentor Match"
        )}&body=${encodeURIComponent(
          `Hola ${profiles[activeStep].firstName} , he visto que ${
            mailCopy ? "eres mentor@" : "buscas mentor@"
          } ... (continua dando un poco más de info)`
        )}`}
      >
        {children}
      </a>
    );
  };

  if (profiles.length < 1) {
    return (
      <>
        <Typography variant={"caption"}>
          Ups! De momento no hay perfiles acordes a ti, pero no desistas, edita
          tus preferencias en el menú, o pulsa el botón para actualizar!
        </Typography>
        <Button
          variant={"outlined"}
          onClick={() => window.location.reload(false)}
        >
          Descubre más perfiles
        </Button>
      </>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
      }}
    >
      <SwipeableViews index={activeStep}>
        {profiles.map((step, index) => {
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
              <Stack
                flexDirection={"row"}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {!!step?.tecnologies &&
                  step.tecnologies.map((x, index) => (
                    <Chip
                      label={x}
                      color="primary"
                      variant="outlined"
                      key={index + "tech"}
                      sx={{ mt: 1, mr: 1 }}
                    />
                  ))}
              </Stack>
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
      <MailTo>
        <Button variant={"outlined"} sx={{ mt: 4 }}>
          <Typography>Haz match</Typography>
          <FavoriteIcon sx={{ ml: 2 }} />
        </Button>
      </MailTo>
    </Box>
  );
}

export default CarouselCards;
