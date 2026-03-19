import { CurrencyPipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { CartItem, Product } from '../../shared/productModel';

@Component({
  selector: 'section[app-product-content]',
  imports: [CurrencyPipe, PercentPipe, TitleCasePipe],
  templateUrl: './product-content.html',
  styleUrl: './product-content.scss',
})
export class ProductContent {
  product = input.required<Product>();

  // Quantity Start

  selectedQuantity = signal<number>(0);

  minusQuantity(): void {
    this.selectedQuantity.update((q) => q - 1);
  }

  plusQuantity(): void {
    this.selectedQuantity.update((q) => q + 1);
  }
  // Quantity End

  newProduct = output<CartItem>();

  addProduct(): void {
    if (this.selectedQuantity() <= 0) return;

    this.newProduct.emit({
      productId: this.product().id,
      quantity: this.selectedQuantity(),
    });

    this.selectedQuantity.set(0);
  }
}
