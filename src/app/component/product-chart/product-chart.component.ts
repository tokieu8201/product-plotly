import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { selectAllProducts } from 'src/app/state/product.selectors';
import { loadProducts } from 'src/app/state/product.actions';
import { tracePrice, traceQuantity, traceSales } from './data-plotly';
import { layout } from './layout';
import { config } from './config';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {
  products$: Observable<Product[]>;
  data!: any[];
  layout: any = {};
  config: any = {};
  constructor(private store: Store<{ products: Product[] }>) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      this.data = [
        traceQuantity(products),
        tracePrice(products),
        traceSales(products)
      ];
      this.layout = layout(products);
      this.config = config();
    });
  }
}
