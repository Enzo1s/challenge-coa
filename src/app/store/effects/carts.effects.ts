import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import * as cartsActions from '../actions/cart.actions'
import { of } from "rxjs";
import { CartService } from "src/app/services/controllers/cart.service";

@Injectable()
export class CartsEffects {

    loadCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cartsActions.loadCart),
            switchMap((action) => {
                return this._cartService.getIdCart(action.id).pipe(
                    map((cart) => cartsActions.loadCartSuccess({cart})),
                    catchError((error) => of (cartsActions.cartError({error})))
                )
            })
        )
    });

    loadCartsByIds$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cartsActions.loadCartsById),
            switchMap((action) => {
                return this._cartService.getCartsId(action.cartId).pipe(
                    map((cart) => cartsActions.loadCartsByIdSuccess({cart})),
                    catchError((error) => of (cartsActions.cartError({error})))
                )
            })
        )
    });

    loadCartIdStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cartsActions.loadCartIdStatus),
            switchMap((action) => {
                return this._cartService.getCartIdandStatus(action.cartId, action.status).pipe(
                    map((cart) => cartsActions.loadCartIdStatusSuccess({cart})),
                    catchError((error) => of (cartsActions.cartError({error})))
                )
            })
        )
    });

    createCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cartsActions.createCart),
            switchMap((action) => {
                return this._cartService.postCart(action.cart).pipe(
                    map((cart) => cartsActions.createCartSuccess({cart})),
                    catchError((error) => of (cartsActions.cartError({error})))
                )
            })
        )
    });

    updateCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cartsActions.uploadCart),
            switchMap((action) => {
                return this._cartService.updateCart(action.cart, action.id).pipe(
                    map((cart) => cartsActions.uploadCartSuccess({cart})),
                    catchError((error) => of (cartsActions.cartError({error})))
                )
            })
        )
    })

    constructor(private actions$: Actions, private _cartService: CartService) {}
}