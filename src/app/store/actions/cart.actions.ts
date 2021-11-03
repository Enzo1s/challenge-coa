import { createAction, props } from "@ngrx/store";
import { Cart } from "src/app/models/ICart";

export const loadCart = createAction('[Cart Firebase] Store Load Cart', props<{id: string}>());
export const loadCartSuccess = createAction('[Cart Firebase] Store Load Cart SUCCESS', props<{cart: Cart}>());

export const loadCartsById = createAction('[Cart Firebase] Store Load Cart By Ids Status', props<{cartId: string[]}>());
export const loadCartsByIdSuccess = createAction('[Cart Firebase] Store Load Cart By Ids SUCCESS', props<{cart: Cart[]}>());

export const loadCartIdStatus = createAction('[Cart Firebase] Store Load Cart By Id And Status', props<{cartId: string, status: string}>());
export const loadCartIdStatusSuccess = createAction('[Cart Firebase] Store Load Cart By Id And Status SUCCESS', props<{cart: Cart[]}>());

export const createCart = createAction('[Cart Firebase] Store Create Cart', props<{cart: Cart}>());
export const createCartSuccess = createAction('[Cart Firebase] Store Create Cart SUCCESS', props<{cart: Cart}>());

export const uploadCart = createAction('[Cart Firebase] Store Upload Cart', props<{cart: Cart, id: string}>());
export const uploadCartSuccess = createAction('[Cart Firebase] Store Upload Cart SUCCESS', props<{cart: Cart}>());

export const cartError = createAction('[Cart Firebase] Store Cart ERROR', props<{error: any}>());