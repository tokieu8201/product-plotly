import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { updateProduct } from 'src/app/state/product.actions';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  editForm!: FormGroup;
  @Input() selectedProduct!: Product;
  @Output() cancel = new EventEmitter<void>();
  error: string = '';

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ){}

  ngOnChanges(): void {
    if (this.editForm && this.selectedProduct) {
      this.editForm.patchValue(this.selectedProduct);
    }
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [{ value: this.selectedProduct.id, disabled: true }],
      name: [this.selectedProduct.name, Validators.required],
      description: [this.selectedProduct.description, Validators.required],
      quantity: [this.selectedProduct.quantity, Validators.required],
      price: [this.selectedProduct.price, Validators.required],
      sales: [this.selectedProduct.sales, Validators.required],
    });
  }
  
  onUpdate() {
    if (this.editForm.valid) {
      const updatedProduct: Product = {
        id: this.selectedProduct.id,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        quantity: this.editForm.value.quantity,
        price: this.editForm.value.price,
        sales: this.editForm.value.sales,
      };
      this.store.dispatch(updateProduct({ product: updatedProduct }));      
      this.cancel.emit();
    }
    else {
      this.error = 'Please enter the required information';
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
