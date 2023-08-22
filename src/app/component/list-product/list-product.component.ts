import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { selectAllProducts } from 'src/app/state/product.selectors';
import { loadProducts } from 'src/app/state/product.actions';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  products$: Observable<Product[]>;
  selectedProduct: Product | null = null;

  constructor(private store: Store<{ products: Product[] }>) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
  
  onEdit(product: Product) {
    this.selectedProduct = product;
  }

  onCancel(): void {
    this.selectedProduct = null;
  }
}
