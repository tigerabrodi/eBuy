import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({product: {_id, name, price, image, date}}) => {
    return (
        <Fragment>
        <div class="card" style="width: 18rem;">
        <img src={image} class="card-img-top" alt="image" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to={`/products/${_id}`}>View</Link>
        </div>
      </div>
        </Fragment>
    );
}

export default ProductItem;
