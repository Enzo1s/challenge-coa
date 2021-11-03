import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import { ProductService } from "src/app/services/controllers/product.service";
import * as productsActions from '../actions/products.actions'
import { of } from "rxjs";

@Injectable()
export class ProductsEffects {

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productsActions.loadProducts),
            switchMap(() => {
                return this._productService.getAllProduct().pipe(
                    map((products) => productsActions.loadProductsSuccess({products})),
                    catchError((error) => of (productsActions.loadProductsError({error})))
                )
            })
        )
    });

    constructor(private actions$: Actions, private _productService: ProductService) { }
}