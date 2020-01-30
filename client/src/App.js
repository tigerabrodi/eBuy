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


if (localStorage.token) {
    setAuthToken(localStorage.token)
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
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
    </Switch>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
