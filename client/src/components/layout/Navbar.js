import React, {Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/auth/auth.actions"
import { getCartProducts } from '../../redux/cart/cart.actions';

const Navbar = ({auth: {isAuthenticated, loading}, cart: {totalQuantity, cartItems}, getCartProducts, logout}) => {

    useEffect(() => {
        getCartProducts();
    }, [cartItems])

    const authLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <Link className="nav-link"
         to="/cart"> {totalQuantity} <i className="fas fa-shopping-cart" /> {" "}
         <span className="hide-sm text-info font-weight-bold text-monospace">
         Cart
         </span>
         </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-info font-weight-bold text-monospace" to="/products">Products</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user" /> {" "}
            <span className="hide-sm text-info font-weight-bold text-monospace">Dashboard</span>
            </Link>
        </li>
        <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
        <i className="fas fa-sign-out-alt" /> {" "}
        <span className="hide-sm text-info font-weight-bold text-monospace">Logout</span>
        </a>
    </li>
    </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto text-info">
        <li className="nav-item">
            <Link className="nav-link text-info font-weight-bold text-monospace" to="/register">Register</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-info font-weight-bold text-monospace" to="/login">Login</Link>
        </li>
    </ul>
    );

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-dark mb-3">
        <div className="container">
            <Link className="navbar-brand text-primary text-monospace font-italic" to={isAuthenticated ? "/dashboard" : "/"}> <i className="fas fa-business-time" /> {" "} eBuy</Link>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {!loading && (
                    <Fragment> {isAuthenticated ? authLinks : guestLinks} 
                    </Fragment>
                )}
            </div>
        </div>
    </nav>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart,
})

export default connect(mapStateToProps, {logout, getCartProducts})(Navbar);
