import { createReducer, on, Action } from "@ngrx/store";
import { User } from "src/app/models/IUser";
import * as authActions from '../actions/auth.actions';

export interface AuthState {
    auth?: any;
    token?:string | null;
    error: any;
}

export const initialState: AuthState = {
    auth: null,
    token: null,
    error: null
}

export const _authReducer = createReducer(
    initialState,
    on(authActions.authSuccess, (state, action) => ({
        auth: action.response,
        token: state.token,
        error: null
    })),
    on(authActions.authError, (state, action) => ({
        auth: state.auth,
        token: state.token,
        error: action.error
    })),
    on(authActions.logout, (state, action) => ({
        auth: state.auth,
        token: state.token,
        error: state.error
    })),
    on(authActions.registerSuccess, (state, action) =>({
        auth: action.response,
        error:null
    })),
    on(authActions.getTokenSuccess, (state, action) => ({
        token: action.token,
        error: null
    }))
)

export function authReducer(state = initialState, action: Action){
    return _authReducer(state, action);
}