import {CartActionTypes} from "./cart.types";


const initialState = {
    cartItems: null,
    totalPrice: null,
    totalQuantity: null,
    loading: true,
    error: {}
}


const cartReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case CartActionTypes.GET_CART_PRODUCTS:
            return {
                ...state,
                cartItems: payload.products,
                totalPrice: payload.totalPrice,
                totalQuantity: payload.totalQuantity,
                loading: false
            }
            case CartActionTypes.DELETE_CART_PRODUCT:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(cartItem => cartItem._id !== payload),
                    loading: false
                }
            case CartActionTypes.ADD_PRODUCT_TO_CART:
                return {
                    ...state,
                    cartItems: [payload, ...state.cartItems],
                    loading: false
                }
                case CartActionTypes.CART_CHECKOUT:
                    return {
                        ...state,
                        cartItems: null,
                        totalPrice: null,
                        totalQuantity: null,
                        loading: false,
                    }
            case CartActionTypes.CART_ERROR:
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
        default:
            return state;
    }
}

export default cartReducer