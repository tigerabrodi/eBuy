import {ProductActionTypes} from "./product.types"
import {setAlert} from "../alert/alert.actions"
import axios from "axios"


// Add A Product
export const addProduct = (productData, history) => async dispatch => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    try {
        const res = await axios.post("/products", formData);
        dispatch({
            type: ProductActionTypes.ADD_PRODUCT,
            payload: res.data
        });
        history.push("/dashboard");
        dispatch(setAlert("Product created successfully", "success"))
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
        type: ProductActionTypes.PRODUCT_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get all products
export const getAllProducts = page => async dispatch => {
    try {
        const res = await axios.get(`/products?page=${page}`);
        dispatch({
            type: ProductActionTypes.GET_PRODUCTS,
            payload: {products: res.data.products, totalItems: res.data.totalItems}
        })
    } catch (err) {
        dispatch({
            type: ProductActionTypes.PRODUCT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}

// Delete a product
export const deleteSingleProduct = (id, history) => async dispatch => {
    try {
        await axios.delete(`/products/${id}`);
        dispatch({
            type: ProductActionTypes.DELETE_PRODUCT,
            payload: id
        });
        dispatch(setAlert("Product deleted successfully", "success"));
        if (history) {
            return history.push("/dashboard")
        }
    } catch (err) {
        dispatch({
            type: ProductActionTypes.PRODUCT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}

// Get A Single users products
export const getUserProducts = (id, page) => async dispatch => {
    try {
        const res = await axios.get(`/products/${id}?page=${page}`);
        dispatch({
            type: ProductActionTypes.GET_PRODUCTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ProductActionTypes.PRODUCT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}

// Edit a Product
export const editProduct = (productData, history, id) => async dispatch => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    try {
        const res = await axios.put(`/products/edit/${id}`, formData);
        dispatch({
            type: ProductActionTypes.UPDATE_PRODUCT,
            payload: res.data
        });
        dispatch(setAlert("Product updated successfully", "success"))
        history.push("/dashboard")
    } catch (err) {
        dispatch({
            type: ProductActionTypes.PRODUCT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}

// Get a single product by ID
export const getProduct = id => async dispatch => {
    try {
        const res = await axios.get(`/products/product/${id}`);
        dispatch({
            type: ProductActionTypes.GET_PRODUCT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ProductActionTypes.PRODUCT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            });
    }
}