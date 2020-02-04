import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import alertReducer from "./alert/alert.reducer";
import productReducer from './product/product.reducer';
import questionReducer from './question/question.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  product: productReducer,
  question: questionReducer,
  cart: cartReducer
});