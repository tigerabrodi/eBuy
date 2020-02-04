import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from "../../redux/alert/alert.actions";
import {register} from "../../redux/auth/auth.actions"
import {connect} from "react-redux";

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData,
        setFormData] = useState({name: '', email: '', password: '', password2: ''});

    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
          setAlert('Passwords do not match', 'danger');
        } else {
          register({ name, email, password });
        }
      };

      
      if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
      }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div class="col-lg-12 text-center">
                        <div class="card bg-danger text-center card-form">
                            <div class="card-body">
                                <h3 className="text-primary text-monospace">Sign Up Today</h3>
                                <p className="text-success font-weight-bold">Please fill out this form to register</p>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <input
                                            onChange={e => onChange(e)}
                                            type="text"
                                            value={name}
                                            name='name'
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            required/>
                                    </div>
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
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            value={password2}
                                            onChange={e => onChange(e)}
                                            type="password"
                                            name='password2'
                                            className="form-control form-control-lg"
                                            placeholder="Confirm Password"
                                            required/>
                                    </div>
                                    <input type="submit" value="Register" className="btn btn-outline-warning btn-block"/>
                                    <Link to="/login">
                                        <p className="text-info">Already have an account ?</p>
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


export default connect(mapStateToProps, {setAlert, register})(Register);
