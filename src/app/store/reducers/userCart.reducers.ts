import { Action, createReducer, on } from "@ngrx/store";
import { UserCart } from "src/app/models/IUserCart";
import * as userCartActions from '../actions/userCart.action';

export interface UserCartState {
    userCart: UserCart [];
    error: any;
}

export const initialState: UserCartState = {
    userCart: [],
    error: null
}

export const _userCartReducer = createReducer(
    initialState,
    on(userCartActions.createUserCartSuccess, (state, action) => ({
        userCart: [action.userCart],
        error: null
    })),
    on(userCartActions.createCartByUserIdSuccess, (state, action) => ({
        userCart: [action.userCart],
        error: null
    })),
    on(userCartActions.loadUserCartByUserSuccess, (state,action) => ({
        userCart: [...action.userCart],
        error:null
    })),
    on(userCartActions.loadUserCartSuccess, (state, Action) =>({
        userCart: [Action.userCart],
        error: null
    })),
    on(userCartActions.userCartError, (state, action) => ({
        userCart: state.userCart,
        error:action.error
    }))
);

export function userCartReducer( state = initialState, action:Action){
    return _userCartReducer(state, action);
}