import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/product/product.actions';
import Spinner from '../layout/Spinner';
import Pagination from './Pagination';
import ProductItem from './ProductItem';

const Products = ({getAllProducts, product: {products, totalProducts, loading}}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    
    useEffect(() => {
        getAllProducts(currentPage);
    }, [currentPage, getAllProducts]);

    return loading ? <Spinner /> : (
        <Fragment>
        <div className="container">
        <div className="row">
        <div className="col text-center">
        <h1 className="text-warning text-monospace">Products</h1>
        <p className="lead text-success font-weight-bold">
         Find Your Item Today
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
    );
} 


const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, {getAllProducts})(Products);
