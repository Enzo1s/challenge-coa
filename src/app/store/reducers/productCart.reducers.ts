import { createReducer, on, Action } from "@ngrx/store";
import { ProductCart } from "src/app/models/IProductCart";
import * as productsCartsActions from '../actions/productCart.action';

export interface ProductCartState {
    productCarts: ProductCart[];
    productCart: ProductCart;
    loading: boolean;
    error: any;
}

export const initialState: ProductCartState = {
    productCarts: [],
    productCart: {cart_id:'',product_id:'', quantity:0},
    loading: true,
    error: null
}

export const _productCartReducer = createReducer(
    initialState,
    on(productsCartsActions.loadProductCartSuccess, (state, action) => ({
        productCarts: [action.productCart],
        productCart: state.productCart,
        loading:false,
        error: null
    })),
    on(productsCartsActions.loadProductsCartsSuccess, (state, action) => ({
        productCarts: [...action.productCart],
        productCart: state.productCart,
        loading:false,
        error: null
    })),
    on(productsCartsActions.loadProductCartByIdsSuccess, (state, action) => ({
        productCarts: [...action.productCart],
        productCart: state.productCart,
        loading:false,
        error: null
    })),
    /* on(productsCartsActions.createProductCartSuccess, (state, action) => ({
        productCart: state.productCart,
        productCarts: [],
        loading:false,
        error: null
    })), */
    
    on(productsCartsActions.uploadProductCartSuccess, (state, action) => ({
        productCarts: [action.productCart],
        productCart: state.productCart,
        loading: false,
        error: null
    })),
    on(productsCartsActions.productCartError, (state, action) => ({
        productCarts: [],
        productCart: state.productCart,
        loading: false,
        error: {
            status: action.error.status,
            message: action.error.message
        }
    })),
)
export function productCartReducer(state = initialState, action: Action) {
    return _productCartReducer(state, action);
}