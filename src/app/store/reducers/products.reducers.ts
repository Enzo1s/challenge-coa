import { createReducer, on, Action } from '@ngrx/store';
import { Product } from 'src/app/models/Iproducts';
import * as productsActions from '../actions/products.actions'

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: any;
}

export const initialState: ProductState = {
    products: [],
    loading: true,
    error: null
}

export const _productsReducer = createReducer(
    initialState,
    on(productsActions.loadProducts, (state, action) => ({
        products: [],
        loading: true,
        error:null
    })),
    on(productsActions.loadProductsSuccess, (state, action) => ({
        products: [...action.products],
        loading: false,
        error: null
    })),
    on(productsActions.loadProductsError, (state, action) => ({
        products:[],
        loading: false,
        error: {
            status: action.error.status,
            message: action.error.message
        }
    }))
);

export function productReducer(state = initialState, action: Action) {
    return _productsReducer(state,action);
}