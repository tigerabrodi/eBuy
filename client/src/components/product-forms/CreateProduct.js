import React, {Fragment, useState} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addProduct} from '../../redux/product/product.actions';

const CreateProduct = ({history, addProduct}) => {
    const [formData,
        setFormData] = useState({name: "", description: "", price: 10, image: ""});
    const [showImage, setShowImage] = useState(false);
    const [imageName, setImageName] = useState("");

    const onChangeImage = e => {
        setFormData({...formData, image: e.target.files[0]});
        setShowImage(true);
        setImageName(e.target.files[0].name)
    }

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

        const onSubmit = e => {
        e.preventDefault();
        addProduct(formData, history);
    }

    const {name, description, price} = formData;
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col text-info font-weight-bold m-2">
                    *- All Fields Requried
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
                        <input type="submit" value="Add Product" className="btn btn-block btn-info"/>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default connect(null, {addProduct})(withRouter(CreateProduct));
