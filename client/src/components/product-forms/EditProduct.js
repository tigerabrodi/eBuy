import React, {Fragment, useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {editProduct, getProduct} from '../../redux/product/product.actions';
import Spinner from '../layout/Spinner';
import { compose } from 'redux';

const EditProduct = ({history, editProduct, getProduct, match, product: {loading, product}}) => {

    const [formData,
        setFormData] = useState({name: "", description: "", price: null, image: ""});
    const [showImage, setShowImage] = useState(false);
    const [imageName, setImageName] = useState("");


    useEffect(() => {
        getProduct(match.params.id);
        setFormData({
            name: loading || !product.name ? "" : product.name,
            description: loading || !product.description ? "" : product.description,
            price: loading || !product.price ? "" : product.price,
            image: ""
        })

    }, [getProduct, loading]);





    const {name, description, price} = formData;

    const onChangeImage = e => {
        setFormData({...formData, image: e.target.files[0]});
        setShowImage(true);
        setImageName(e.target.files[0].name);
    }

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

        const onSubmit = e => {
        e.preventDefault();
        editProduct(formData, history, match.params.id);
        }



    return (
        <Fragment>
            <div className="container">
                <div className="row">
                {loading && (
                    <Spinner />
                )}
                    <div className="col text-info font-weight-bold m-2">
                    *- All Fields Requried!
                        <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group m-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter Products Name" name="name" value={name} onChange={e => onChange(e)} className="form-control" required/>
                        </div>
                        <div className="form-group m-2">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" placeholder="Enter Products Price" value={price} onChange={e => onChange(e)}  className="form-control" required/>
                        </div>
                        <div className="custom-file m-2">
                        <input type="file"  onChange={e => onChangeImage(e)}  className="custom-file-input bg-info" required/>
                        <label className="custom-file-label">{showImage ? imageName : "Upload Image"}</label>
                      </div>
                        <div className="form-group m-2">
                        <label htmlFor="title">Description</label>
                        <textarea name="description" onChange={e => onChange(e)} placeholder="Enter Products description" value={description} className="form-control" required/>
                        </div>
                        <input type="submit" value="Edit Product" className="btn btn-block btn-info"/>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default compose(withRouter, connect(mapStateToProps, {editProduct, getProduct}))(EditProduct);
