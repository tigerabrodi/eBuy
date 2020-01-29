import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const ProductItem = ({
    product: {
        _id,
        name,
        price,
        image
    }
}) => {
    return (
        <Fragment>
            <div class="card bg-success rounded-lg">
                <img src={image} class="card-img-top" alt="image"/>
                <div class="card-body">
                    <h5 class="card-title text-center text-danger bg-warning">
                        {name}
                    </h5>
                    <p class="card-text font-weight-bold text-center">Price: {price} <i class="fas fa-dollar-sign" /></p>
                    <Link className="text-center btn btn-block btn-outline-warning" to={`/products/${_id}`}>View</Link>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductItem;
