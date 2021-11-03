import { createAction, props } from "@ngrx/store";
import { ProductCart } from "src/app/models/IProductCart";

export const loadProductsCarts = createAction('[ProductCart List/Firebase] Store Load Products Carts', props<{ cartId: string }>());
export const loadProductsCartsSuccess = createAction('[ProductCart List/Firebase] Store Load Products Carts SUCCESS', props<{ productCart: ProductCart[] }>());

export const loadProductCart = createAction('[ProductCart Firebase] Store Load Product Cart', props<{ id: string }>());
export const loadProductCartSuccess = createAction('[ProductCart Firebase] Store Load Product Cart SUCCESS', props<{ productCart: ProductCart }>());

export const loadProductCartByIds = createAction('[ProductCart Firebase] Store Load Product Cart By Ids', props<{ cartId: string, productId:string }>());
export const loadProductCartByIdsSuccess = createAction('[ProductCart Firebase] Store Load Product Cart By Ids SUCCESS', props<{ productCart: ProductCart[] }>());

export const createProductCart = createAction('[ProductCart Firebase] Store Create Product Cart', props<{ productCart: ProductCart }>());
export const createProductCartSuccess = createAction('[ProductCart Firebase] Store Create Product Cart SUCCESS');

export const uploadProductCart = createAction('[ProductCart Firebase] Store Upload Product Cart', props<{ productCart: ProductCart, id: string }>());
export const uploadProductCartSuccess = createAction('[ProductCart Firebase] Store Upload Product Cart SUCCESS', props<{ productCart: ProductCart }>());

export const productCartError = createAction('[ProductCart Firebase] Store Product Cart ERROR', props<{ error: any }>());