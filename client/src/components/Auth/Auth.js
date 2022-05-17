//importaciones
import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";

//material-ui
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

//react-router
import { useNavigate } from "react-router-dom";

//google-login
import { GoogleLogin } from "react-google-login";

//componentes
import Icon from "./Icon";
import Input from "./Input";

//acciones
import { signup, signin } from "../../actions/auth.actions";

//constantes
import { AUTH } from "../../constants/actionTypes";

//estilos
import useStyles from "./styles";

//config
import { GOOGLE_ID } from "../../config";

//variable de estado inicial
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  //variables de estado
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  //variables del hook de redux
  const dispatch = useDispatch();

  //variables del hook de react-router
  const navigate = useNavigate();

  //variables del hook useStyles
  const classes = useStyles();

  //funciones
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    //variables
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = () => {
    console.error(
      `El inicio de sesión de Google no tuvo éxito. Vuelva a intentarlo más tarde.`
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Registrarse" : "Iniciar Sesión"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="Nombre"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Apellido"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Contraseña"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repetir Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Registrarse" : "Iniciar Sesión"}
          </Button>
          <GoogleLogin
            clientId={GOOGLE_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Iniciar Sesión Con Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "¿Ya tienes una cuenta? Inicia sesión"
                  : "¿No tienes una cuenta? Registrate"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
