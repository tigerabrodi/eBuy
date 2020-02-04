import axios from "axios";
import {setAlert} from "../alert/alert.actions"
import {AuthActionTypes} from "./auth.types"
import setAuthToken from "../../utils/setAuthToken"
import { getCartProducts } from "../cart/cart.actions";

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get('/auth');
  
      dispatch({
        type: AuthActionTypes.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AuthActionTypes.AUTH_ERROR
      });
    }
  };

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ name, email, password });
  
    try {
      const res = await axios.post('/auth/signup', body, config);
  
      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch(getCartProducts());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: AuthActionTypes.REGISTER_FAIL
      });
    }
  };

    // Login User
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post('/auth/signin', body, config);
  
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch(getCartProducts());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: AuthActionTypes.LOGIN_FAIL
      });
    }
  };

    // Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: AuthActionTypes.LOGOUT });
  };