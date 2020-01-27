import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import alertReducer from "./alert/alert.reducer";
import productReducer from './product/product.reducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  product: productReducer
});