import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/auth-context";

const Header = () => {
  const { state, logout } = useContext(AuthContext);
  const { loggedUser } = state;

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
        {!!loggedUser ? (
          <>
            <Link to={"/"}>
              <Typography variant="h6" component="div">
                Mentor Match
              </Typography>
            </Link>
          </>
        ) : (
          <Link to={"/"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => logout()}
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
