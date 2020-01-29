import React from 'react';
import {Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';

const Landing = ({isAuthenticated}) => {
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }
    return (
        <section id="showcase">
        <div className="overlay text-danger">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="display-2 mt-5 pt-5">
                  Start To Make Money Today!
                </h1>
                <p className="lead">Buy, Sell & Profit <i className="fas fa-search-dollar"/> </p>
                <Link to="/register" className="btn mr-3 btn-outline-info btn-md text-white">
                 Sign Up
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-md text-white">
                Sign In
               </Link>
              </div>
            </div>
          </div>
        </div> 
        </section>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
