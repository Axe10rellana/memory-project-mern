//api
import * as api from "../api";

//constantes
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //variables
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.error(error.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //variables
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.error(error.message);
  }
};
