import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { UserCartService } from "src/app/services/controllers/user-cart.service";
import * as userCartActions from '../actions/userCart.action';

@Injectable()
export class UserCartEffects {

    loadUserCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCartActions.loadUserCart),
            switchMap((action) => {
                return this._userCartService.getUserCarId(action.id).pipe(
                    map((userCart) => userCartActions.loadUserCartSuccess({ userCart })),
                    catchError((error) => of(userCartActions.userCartError({ error })))
                )
            })
        )
    });

    loadUserCartByUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCartActions.loadUserCartByUser),
            switchMap((action) => {
                return this._userCartService.getCartByIdUser(action.user_id).pipe(
                    map((userCart) => userCartActions.loadUserCartByUserSuccess({ userCart })),
                    catchError((error) => of(userCartActions.userCartError({ error })))
                )
            })
        )
    });

    createUserCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCartActions.createUserCart),
            switchMap((action) => {
                return this._userCartService.postUserCart(action.userCart).pipe(
                    map((userCart) => userCartActions.createUserCartSuccess({ userCart })),
                    catchError((error) => of(userCartActions.userCartError({ error })))
                )
            })
        )
    });

    createCartByUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCartActions.createCartByUserId),
            switchMap((action) => {
                return  this._userCartService.createUserCart(action.userId).pipe(
                    map((userCart) => userCartActions.createCartByUserIdSuccess({userCart})),
                    catchError((error) => of(userCartActions.userCartError({error})))
                )
            })
        )
    })

    constructor(private actions$: Actions, private _userCartService: UserCartService) { }
}