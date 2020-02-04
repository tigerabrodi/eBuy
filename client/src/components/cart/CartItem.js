import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { deleteCartItem } from '../../redux/cart/cart.actions';

const CartItem = ({
    cartItem,
    deleteCartItem
}) => {
    return (
        <Fragment>
            <div className="card bg-success rounded-lg">
                <img src={cartItem.product.image} className="card-img-top" alt="product"/>
                <div className="card-body">
                    <h5 className="card-title text-center text-danger bg-warning">
                        {cartItem.product.name}
                    </h5>
                    <p className="card-text font-weight-bold text-center">Total Price: <strong>{cartItem.product.price * cartItem.quantity}</strong> 
                        <i className="fas fa-dollar-sign"/></p>
                        <p className="card-text font-weight-bold text-center">Quantity: <strong>{cartItem.quantity}</strong> 
                        </p>
                    <Link className="btn btn-outline-warning mx-1" to={`/products/${cartItem.product._id}`}>View</Link>
                    <button onClick={() => deleteCartItem(cartItem._id)} className="btn btn-outline-danger"> <i className="fas fa-trash-alt" /> </button>
                </div>
            </div>
        </Fragment>
    );
}

export default connect(null, {deleteCartItem})(CartItem);
