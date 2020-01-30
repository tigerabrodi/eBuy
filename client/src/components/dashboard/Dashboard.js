import React, {useEffect, Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from '../products/Pagination';
import ProductItem from '../products/ProductItem';
import { getUserProducts } from '../../redux/product/product.actions';
import Spinner from '../layout/Spinner';

const Dashboard = ({product: {products, loading, totalProducts}, loadUser, getUserProducts, auth: {user}}) => {


    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const paginate = pageNumber => setCurrentPage(pageNumber);
        useEffect(() => {
        getUserProducts(user._id, currentPage);
    }, [currentPage, getUserProducts, user._id]);

    return (
        <Fragment>
        <div className="container">
            <div className="row">
                <div className="col text-center">
                <h1 className="text-monospace text-info display-2">Dashboard</h1>
                <Link to="/add-product" className="btn btn-block btn-warning">Add Product <i className="far fa-money-bill-alt" /> </Link>
                </div>
            </div>
        </div>
        <br />
        {loading ||!products && (
            <Spinner />
        )}
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
    );
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
})

export default connect(mapStateToProps, {getUserProducts})(Dashboard);
