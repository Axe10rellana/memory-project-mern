//importaciones
import React, { useState, useEffect } from "react";

//react-router
import { Link, useNavigate, useLocation } from "react-router-dom";

//react-redux
import { useDispatch } from "react-redux";

//constantes
import { LOGOUT } from "../../constants/actionTypes";

//jwt-decode
import decode from "jwt-decode";

//material-ui
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";

//imagenes
import memoriesLogo from "../../assets/images/memories-Logo.png";

//estilos
import useStyles from "./styles";

const Navbar = () => {
  //variables del useStyles
  const classes = useStyles();

  //variables de estado
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  //variables del hook de react-redux
  const dispatch = useDispatch();

  //variables del hook de react-router
  const navigate = useNavigate();
  const location = useLocation();

  //funciones
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  //useEffect
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">
          Memorias
        </Typography>
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
