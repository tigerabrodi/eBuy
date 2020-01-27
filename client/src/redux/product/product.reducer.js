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
        case ProductActionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: [payload, ...state.products],
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