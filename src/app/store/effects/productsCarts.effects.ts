import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ProductCartService } from "src/app/services/controllers/product-cart.service";
import * as productsCartsActions from '../actions/productCart.action';

@Injectable()
export class ProductCartEffects {

    loadProductsCarts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productsCartsActions.loadProductsCarts),
            switchMap((action) => {
                return this._productCartService.getProductsCarts(action.cartId).pipe(
                    map((productCart) => productsCartsActions.loadProductsCartsSuccess({productCart})),
                    catchError((error) => of (productsCartsActions.productCartError({error})))
                )
            })
        )
    });

    loadProductCartByIds$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productsCartsActions.loadProductCartByIds),
            switchMap((action) => {
                return this._productCartService.getByProductCart(action.cartId,action.productId).pipe(
                    map((productCart) => productsCartsActions.loadProductCartByIdsSuccess({productCart})),
                    catchError((error) => of (productsCartsActions.productCartError({error})))
                )
            })
        )
    });

    loadProductCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productsCartsActions.loadProductCart),
            switchMap((action) => {
                return this._productCartService.getProductCartId(action.id).pipe(
                    map((productCart) => productsCartsActions.loadProductCartSuccess({productCart})),
                    catchError((error) => of (productsCartsActions.productCartError({error})))
                )
            })
        )
    });

    createCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productsCartsActions.createProductCart),
            switchMap((action) => {
                return this._productCartService.postProductCart(action.productCart).pipe(
                    map(() => productsCartsActions.createProductCartSuccess()),
                    catchError((error) => of (productsCartsActions.productCartError({error})))
                )
            })
        )
    })

    uploadProductCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productsCartsActions.uploadProductCart),
            switchMap((action) => {
                return this._productCartService.updateProductCart(action.productCart, action.id).pipe(
                    map((productCart) => productsCartsActions.uploadProductCartSuccess({productCart})),
                    catchError((error) => of (productsCartsActions.productCartError({error})))
                )
            })
        )
    })

    constructor(private actions$: Actions, private _productCartService: ProductCartService) { }
}