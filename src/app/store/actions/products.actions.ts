import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Iproducts';

export const loadProducts = createAction('[Product List/Firebase] Store Products');
export const loadProductsSuccess = createAction('[Product List/Firebase] Store Products SUCCESS', props<{products: Product[]}>());

export const loadProduct = createAction('[Product Firebase] Store Product', props<{ id: number }>());
export const loadProductSuccess = createAction('[Product Firebase] Store Product SUCCESS', props<{ product: Product }>());

export const loadProductsError = createAction('[Product List/Firebase] Store Products ERROR', props<{error: any}>());
