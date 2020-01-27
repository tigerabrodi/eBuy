import {ProductActionTypes} from "./product.types"
import {setAlert} from "../alert/alert.actions"
import axios from "axios"



export const addProduct = (productData, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    const formData = new FormData();
    formData.append("title", productData.title)
    formData.append("description", productData.description)
    formData.append("price", productData.price)
    formData.append("image", productData.image)
    try {
        const res = axios.post("/products/", formData, config);
        dispatch({
            type: ProductActionTypes.ADD_PRODUCT,
            payload: res.data
        })
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
