import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/product.model";
import { loadProductsSuccess, updateProductSuccess } from "./product.actions";

export interface ProductState {
    products: Product[];
}

export const initialState: ProductState = {
    products: [],

}

export const productReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products }) => ({
        ...state, products
    })),
    
    on(updateProductSuccess, (state, {product}) => ({
        ...state,
        products: state.products.map(p => (p.id === product.id ? product : p))  
    })),

)
