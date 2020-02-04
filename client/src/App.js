import './App.css';
import React, {Fragment, useEffect} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from "./redux/store";
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/auth/auth.actions';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProduct from './components/product-forms/CreateProduct';
import Products from './components/products/Products';
import EditProduct from './components/product-forms/EditProduct';
import Product from './components/product/Product';
import { getCartProducts } from './redux/cart/cart.actions';
import Profile from './components/profile/Profile';
import Cart from './components/cart/Cart';


if (localStorage.token) {
    setAuthToken(localStorage.token)
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCartProducts());
  }, []);
  
  return (  
    <Provider store={store}>
    <Router>
    <Fragment>
    <Navbar />
    <Alert />
    <Route exact path="/" component={Landing} />
    <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/add-product" component={CreateProduct} />
    <PrivateRoute exact path="/products" component={Products} />
    <PrivateRoute exact path="/products/edit/:id" component={EditProduct} />
    <PrivateRoute exact path="/products/:id" component={Product} />
    <PrivateRoute exact path="/user/products/:id" component={Profile} />
    <PrivateRoute exact path="/cart" component={Cart} />
    </Switch>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
