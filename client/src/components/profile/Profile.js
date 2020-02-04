import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserProducts } from '../../redux/product/product.actions';
import Pagination from '../products/Pagination/Pagination';
import Spinner from '../layout/Spinner';
import ProductItem from '../products/ProductItem/ProductItem';

const Profile = ({product: {products, totalProducts, loading}, match, getUserProducts}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        getUserProducts(match.params.id, currentPage);
    }, [currentPage, products]);

    return loading ?
        <Spinner /> : (
        <Fragment>
        <div className="container">
        <div className="row">
        <div className="col text-center">
        <h1 className="text-warning text-monospace">Products</h1>
        <p className="lead text-success font-weight-bold">
         Find Items From This Person!
        </p>
        </div>
        </div>
        </div>
        <div className="container">
        <div className="row">
        {products.map(product => (
            <div className="col-md-4 col-6">
                <ProductItem key={product._id} product={product} /> 
            </div>
        ))};
        <div className="col-12">
        {products && (
                    <Pagination productsPerPage={productsPerPage} totalProducts={totalProducts} paginate={paginate} />
        )}

        </div>
        </div>
        </div>
        </Fragment>
        )
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, {getUserProducts})(Profile);
