import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { productReducer, ProductState } from './products.reducers';
import { cartReducer, CartState } from './cart.reducers';
import { productCartReducer, ProductCartState } from './productCart.reducers';
import { authReducer, AuthState } from './auth.reducers';
import { userCartReducer, UserCartState } from './userCart.reducers';

export const reducers: ActionReducerMap<IState> = {
  productReducer: productReducer,
  cartReducer: cartReducer,
  productCartReducer: productCartReducer,
  authReducer:authReducer,
  userCartReducer: userCartReducer
}

export interface IState {
  productReducer: ProductState;
  cartReducer: CartState;
  productCartReducer: ProductCartState;
  authReducer: AuthState;
  userCartReducer: UserCartState;
}