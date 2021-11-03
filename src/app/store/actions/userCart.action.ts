import { createAction, props } from "@ngrx/store";
import { UserCart } from "src/app/models/IUserCart";

export const loadUserCart = createAction('[UserCart Firebase] load User Cart', props<{id: string}>());
export const loadUserCartSuccess = createAction('[UserCart Firebase] load User Cart SUCCESS', props<{userCart: UserCart}>());

export const loadUserCartByUser = createAction('[UserCart Firebase] load User Cart By User', props<{user_id: string}>());
export const loadUserCartByUserSuccess = createAction('[UserCart Firebase] load User Cart By User Success', props<{userCart: UserCart[]}>());

export const createCartByUserId = createAction('[UserCart Firebase] Create Cart By User', props<{userId: string}>())
export const createCartByUserIdSuccess = createAction('[UserCart Firebase] Create Cart By User SUCCESS', props<{userCart: UserCart}>())

export const createUserCart =createAction('[UserCart Firebase] Create User Cart', props<{userCart: UserCart}>());
export const createUserCartSuccess =createAction('[UserCart Firebase] Create User Cart SUCCESS', props<{userCart: UserCart}>());

export const userCartError = createAction('[UserCart Firebase] User Cart ERROR', props<{error: any}>());

