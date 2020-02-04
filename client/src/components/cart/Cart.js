import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCartProducts } from '../../redux/cart/cart.actions';
import CartItem from './CartItem';
import StripeButton from './StripeButton';

const Cart = ({getCartProducts, cart: {cartItems, totalQuantity, loading, totalPrice}}) => {
    useEffect(() => {
        getCartProducts();
    }, [cartItems, totalQuantity, totalPrice]);

    return loading ? <Spinner /> : (
        <Fragment>
        <div className="container">
        <div className="row">
        <div className="col text-center">
        <h1 className="text-warning text-monospace">Your Cart!</h1>
        <p className="lead text-success font-weight-bold">
         Total Price: <strong className="text-danger font-weight-bold text-monospace">{totalPrice + "$"} </strong>{" "} Total Items in Quantity: <strong className="text-danger font-weight-bold text-monospace">{totalQuantity + "X"} </strong>
        </p>
        </div>
        </div>
        </div>
        <div className="container">
        <div className="row">
        {cartItems.map(cartItem => (
            <div className="col-md-4 col-6">
                <CartItem key={cartItem._id} cartItem={cartItem} /> 
            </div>
        ))};

        </div>
        <br />
        <div className="col text-center mt-5">
        <h1 className="lead text-danger font-weight-bold mb-4">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
        </h1>
        <StripeButton price={totalPrice} />
        </div>
        </div>
        </Fragment>
    );
} 


const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, {getCartProducts})(Cart);