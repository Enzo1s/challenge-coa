import { createReducer, on, Action } from '@ngrx/store';
import { Cart } from 'src/app/models/ICart';
import * as cartActions from '../actions/cart.actions'

export interface CartState {
    cart: Cart;
    carts: Cart[];
    loading: boolean;
    error: any;
}

export const initialState: CartState = {
    cart: {id:'',status: 'pending'},
    carts: [],
    loading: true,
    error: null
}

export const _cartReducer = createReducer(
    initialState,
    on(cartActions.loadCart, (state, action) => ({
        cart: state.cart,
        carts: [],
        loading: true,
        error: null
    })),
    on(cartActions.loadCartSuccess, (state, action) => ({
        cart: action.cart,
        carts: [],
        loading: false,
        error: null
    })),
    on(cartActions.loadCartsByIdSuccess, (state, action) => ({
        cart: state.cart,
        carts: [...action.cart],
        loading: false,
        error: null
    })),
    on(cartActions.loadCartIdStatusSuccess, (state, action) => ({
        cart: action.cart[0],
        carts: [],
        loading: false,
        error: null
    })),
    on(cartActions.createCartSuccess, (state, action) => ({
        cart: action.cart,
        carts: [],
        loading: false,
        error: null
    })),
    on(cartActions.uploadCartSuccess, (state, action) => ({
        cart: action.cart,
        carts: [],
        loading: false,
        error: null
    })),
    on(cartActions.cartError, (state, action) => ({
        cart: state.cart,
        carts: [],
        loading: false,
        error:  {
            status: action.error.status,
            message: action.error.message
        }
    })),
)

export function cartReducer(state = initialState, action: Action) {
    return _cartReducer(state, action);
}