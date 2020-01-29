import {ProductActionTypes} from "./product.types";

const initialState = {
    products: [],
    totalProducts: null,
    product: null,
    loading: true,
    error: {}
}

const productReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch(type) {
        case ProductActionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                totalProducts: payload.totalItems,
                loading: false
            }
        case ProductActionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: [payload, ...state.products],
                loading: false
            }
            case ProductActionTypes.DELETE_PRODUCT:
                return {
                    ...state,
                    products: state.products.filter(product => product._id !== payload),
                    loading: false
                }
            case ProductActionTypes.PRODUCT_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default productReducer