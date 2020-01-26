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
    </Switch>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
