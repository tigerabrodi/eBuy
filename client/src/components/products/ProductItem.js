import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSingleProduct } from '../../redux/product/product.actions';

const ProductItem = ({
    deleteSingleProduct,
    auth,
    product: {
        _id,
        name,
        price,
        image,
        user
    }
}) => {
    return (
        <Fragment>
            <div className="card bg-success rounded-lg">
                <img src={image} className="card-img-top" alt="product"/>
                <div className="card-body">
                    <h5 className="card-title text-center text-danger bg-warning">
                        {name}
                    </h5>
                    <p className="card-text font-weight-bold text-center">Price: {price} <i className="fas fa-dollar-sign" /></p>
                                        <Link className="btn btn-outline-warning mx-1" to={`/products/${_id}`}>View</Link>
                    {user._id === auth.user._id ? (
                        <Fragment>
                        <Link className="text-center btn btn-outline-danger mx-1" to={`/products/edit/${_id}`}><i className="fas fa-edit" /> </Link>
                        <button className="btn btn-outline-dark" onClick={() => deleteSingleProduct(_id)}> <i className="fas fa-trash-alt" /> </button>
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteSingleProduct})(ProductItem);
