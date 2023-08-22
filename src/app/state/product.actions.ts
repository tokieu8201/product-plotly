import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product.model";


export const loadProducts = createAction('[Product] Load products');

export const loadProductsSuccess = createAction(
    '[Product] Load products success',
    props<{ products: Product[]}>()
);

export const updateProduct = createAction(
    '[Product] Update',
    props< { product: Product}>()
);

export const updateProductSuccess = createAction(
    '[Product] Update product Success',
    props<{ product: Product }>()
);