//importaciones
import React from "react";

//imagenes
import Error404 from "../../assets/icons/error404.svg";

//material-ui
import { Paper, Typography } from "@material-ui/core";

//react-router
import { Link } from "react-router-dom";

//estilos css
import useStyles from "./styles";

const NotFound = () => {
  //variables del useStyles
  const classes = useStyles();

  return (
    <Paper elevation={6} className={classes.container}>
      <img src={Error404} alt="Error 404" className={classes.img404} />
      <div className={classes.wrapper}>
        <Typography component="h1" variant="h1" className={classes.h1}>
          Error 404
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          className={classes.message404}
        >
          No existe la publicación o la ruta es incorrecta
        </Typography>
        <Link to="/" className={classes.btnSuccessSm}>
          Volver
        </Link>
      </div>
    </Paper>
  );
};

export default NotFound;
