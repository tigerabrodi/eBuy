import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../../redux/auth/auth.actions";


const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

      const { email, password } = formData;

      const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

      const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
      };

      if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
      }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="card bg-warning text-center card-form">
                            <div className="card-body">
                                <h3 className="text-danger font-weight-bold">Sign Into Your Account</h3>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <input
                                            onChange={e => onChange(e)}
                                            type="email"
                                            name='email'
                                            value={email}
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                        onChange={e => onChange(e)}
                                            type="password"
                                            name='password'
                                            value={password}
                                            minLength='6'
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            required/>
                                    </div>
                                    <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                                    <Link to="/register">
                                        <p className="text-dark">Don't Have an account? </p>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, {login})(Login);
