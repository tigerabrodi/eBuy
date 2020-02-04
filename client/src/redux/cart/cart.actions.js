import axios from "axios";
import {CartActionTypes} from "./cart.types";
import {setAlert} from "../alert/alert.actions";


export const addProductToCart = productId => async dispatch => {
    try {
        const res = await axios.post(`/cart/${productId}`);
        dispatch({
            type: CartActionTypes.ADD_PRODUCT_TO_CART,
            payload: res.data
        });
        dispatch(setAlert("Successfully added product to cart", "success"));
    } catch (err) {
        dispatch({
            type: CartActionTypes.CART_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}


export const getCartProducts = () => async dispatch => {
    try {
        const res = await axios.get(`/cart`);
        dispatch({
            type: CartActionTypes.GET_CART_PRODUCTS,
            payload: {products: res.data.products, totalPrice: res.data.totalPrice, totalQuantity: res.data.totalQuantity}
        });
    } catch (err) {
        dispatch({
            type: CartActionTypes.CART_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}


export const deleteCartItem = id => async dispatch => {
    try {
        await axios.delete(`/cart/cart-delete/${id}`);
        dispatch({
            type: CartActionTypes.DELETE_CART_PRODUCT,
            payload: id
        });
        dispatch(setAlert("Successfully removed item from cart", "success"));
        dispatch(getCartProducts());
    } catch (err) {
        dispatch({
            type: CartActionTypes.CART_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}

export const postCartPayment = (amount, token) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({amount, token});

    try {
        await axios.post("/cart/payment", body, config);
        dispatch({
            type: CartActionTypes.CART_CHECKOUT
        })
        dispatch(setAlert("Payment went through successfully!", "success"));
    } catch (err) {
        dispatch(setAlert("There was an issue with your payment", "danger"))
        dispatch({
            type: CartActionTypes.CART_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
            });
    }

}