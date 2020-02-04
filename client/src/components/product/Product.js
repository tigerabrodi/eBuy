import React, {Fragment, useState, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import {getProduct, deleteSingleProduct} from "../../redux/product/product.actions";
import {getQuestions} from "../../redux/question/question.actions";
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import QuestionForm from './Question/QuestionForm';
import Question from './Question/Question';
import { compose } from 'redux';


const Product = ({getProduct, deleteSingleProduct, getQuestions, history, match, product: {product, loading}, auth, question: {questions}}) => {
    useEffect(() => {
        getProduct(match.params.id);
        getQuestions(match.params.id);
    }, [product, questions]);

    return loading || !product || !auth.user ? 
    (
        <Spinner />
    ) : (
        <Fragment>

        <div className="container">
            <div className="col text-center bg-dark">
            <h1 className="title text-danger">Sold by <Link className="text-info text-monospace" to={`/user/products/${product.user._id}`}>{product.user.name}</Link></h1>
            </div>
        <div className="row">
        <div className="col text-center">
        <img src={product.image} alt="productImage" className="img-fluid"/>
                        {product.user._id === auth.user._id && (
            <Fragment>
            <div className="col">
            <Link to={`/products/edit/${product._id}`} className="btn btn-dark m-3">Edit</Link>
            <button className="btn btn-danger" onClick={() => deleteSingleProduct(product._id, history)}>
            Delete
            </button>
            </div>
            </Fragment>
        )}
        <p className="lead"> {product.name}  <strong className="text-monospace text-danger font-weight-bold">{product.price}$ </strong> </p>
        <p className="text-warning font-weight-bold text-monospace"> {product.description} </p>
        {product.user._id !== auth.user._id && (
                    <QuestionForm id={product._id} />
        )}
        {questions.map(question => (
            <Fragment>
            <Question key={question._id} question={question} productUserId={product.user._id} userId={auth.user._id} />
            </Fragment>
        ))}
        </div>
        </div>
        </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth,
    question: state.question,
});

export default compose(withRouter, connect(mapStateToProps, {getProduct, deleteSingleProduct, getQuestions}))
(Product);
