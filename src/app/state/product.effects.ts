import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { loadProducts, loadProductsSuccess, updateProduct, updateProductSuccess } from './product.actions';

@Injectable()
export class ProductEffects{

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ){}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            loadProductsSuccess({ products })
          ),
          catchError(() => of({ type: 'Load Products Failed' }))
        )
      )
    )
  );

  updateProduct$ = createEffect(() => 
    this.actions$.pipe(
      ofType(updateProduct),
      exhaustMap(({ product}) =>
        this.productService.updateProduct(product).pipe(
          map(updatedProduct => updateProductSuccess({product: updatedProduct})),
          catchError(() => of({ type: 'Update Failed' }))
        )
      )
    )
  );

}
