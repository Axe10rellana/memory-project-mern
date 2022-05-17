//importaciones
import React from "react";

//material-ui
import { Typography } from "@material-ui/core";

//componentes
import GitHub from "./Github";
import LinkeIn from "./LinkeIn";

//estilos css
import useStyles from "./styles";

const Footer = () => {
  //variables
  const anioActual = new Date().getFullYear();

  //variables del useStyles
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      &copy; {anioActual} Axe10rellana
      <Typography
        gutterBottom
        component="p"
        variant="body1"
        className={classes.p}
      >
        Redes Sociales
      </Typography>
      <div className={classes.socialIcons}>
        <a
          href="https://github.com/Axe10rellana"
          target="_blank"
          rel="noreferrer"
          className={classes.github}
        >
          <GitHub fill="#fff" width={24} height={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/axel-orellana/"
          target="_blank"
          rel="noreferrer"
          className={classes.linkeIn}
        >
          <LinkeIn fill="#fff" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
