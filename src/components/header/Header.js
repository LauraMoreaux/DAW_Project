import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/auth-context";
import { Tooltip } from "@mui/material";

const Header = () => {
  const { state, logout, isLoginPending } = useContext(AuthContext);
  const { loggedUser } = state;

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {isLoginPending ? (
          <></>
        ) : (
          <>
            <Link to={"/my-account"}>
              <Tooltip title={"Ir a tu cuenta"}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={"/"}>
              <Typography variant="h6" component="div">
                Mentor Match
              </Typography>
            </Link>
            {!!loggedUser && (
              <Link to={"/"}>
                <Tooltip title={"Cerrar sesión"}>
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
                </Tooltip>
              </Link>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
