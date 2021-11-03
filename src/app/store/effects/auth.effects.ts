import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "src/app/services/controllers/auth.service";

@Injectable()
export class AuthEffects {

    sigin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.sigin),
            switchMap((action) => {
                return this._authService.singIn(action.user).pipe(
                    map((response) => authActions.authSuccess({ response })),
                    catchError((error) => of(authActions.authError({ error })))
                )
            })
        )
    });

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.register),
            switchMap((action) => {
                return this._authService.createuser(action.user).pipe(
                    map((response) => authActions.registerSuccess({ response })),
                    catchError((error) => of(authActions.authError({ error })))
                )
            })
        )
    })

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.logout),
            switchMap(() => {
                return this._authService.logOut().pipe(
                    map(() => authActions.logoutSuccess()),
                    catchError((error) => of (authActions.authError({error})))
                )
            })
        )
    })

    getToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.getToken),
            switchMap(() => {
                return this._authService.getToken().pipe(
                    map((token) => authActions.getTokenSuccess({token})),
                    catchError((error) => of (authActions.authError({error})))
                )
            })
        )
    })

    constructor(private actions$: Actions, private _authService: AuthService) { }
}