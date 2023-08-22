import { Product } from "src/app/models/product.model";

export const traceQuantity = (products: Product[]) => ({
  x: products.map((product) => product.name),
  y: products.map((product) => product.quantity),
  type: 'bar',
  name: 'Quantity',
  xaxis: 'x',
  yaxis: 'y',
  offsetgroup: 2
});

export const tracePrice = (products: Product[]) => ({
  x: products.map((product) => product.name),
  y: products.map((product) => product.price),
  type: 'bar',
  name: 'Price',
  marker: {
    color: 'rbg(49,130,189)'
  },
  xaxis: 'x',
  yaxis: 'y2',
  offsetgroup: 1
});

export const traceSales = (products: Product[]) => ({
  x: products.map((product) => product.name),
  y: products.map((product) => product.sales),
  mode: 'lines+markers',
  line: {
    color: '#DCDCDC',
  },
  name: 'Sales',
  marker: {
    color: 'rbg(49,130,189)'
  },
  xaxis: 'x',
  yaxis: 'y3',
});
