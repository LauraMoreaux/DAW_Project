import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [logOutIcon, setLogoutIcon] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogoutIcon(true);
    }
    console.log(localStorage.getItem("user"), logOutIcon);
  }, [window.location, localStorage]);
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to={"/my-account"}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Link>
        <Link to={"/"}>
          <Typography variant="h6" component="div">
            Mentor Match
          </Typography>
        </Link>
        {logOutIcon && (
          <Link to={"/"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setLogoutIcon(false);
                localStorage.removeItem("user");
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
