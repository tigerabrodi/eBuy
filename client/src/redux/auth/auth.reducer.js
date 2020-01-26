import {AuthActionTypes} from "./auth.types";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
}


const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case AuthActionTypes.USER_LOADED:
          return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
          };
        case AuthActionTypes.REGISTER_SUCCESS:
        case AuthActionTypes.LOGIN_SUCCESS:
          localStorage.setItem('token', payload.token);
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
          };
        case AuthActionTypes.REGISTER_FAIL:
        case AuthActionTypes.AUTH_ERROR:
        case AuthActionTypes.LOGIN_FAIL:
        case AuthActionTypes.LOGOUT:
        case AuthActionTypes.ACCOUNT_DELETED:
          case AuthActionTypes.USER_ERROR:
          localStorage.removeItem('token');
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
          };
        default:
          return state;
    }
}

export default authReducer