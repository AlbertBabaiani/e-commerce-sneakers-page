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

  selected_quantity = signal<number>(0);

  minusQuantity(): void {
    this.selected_quantity.update((q) => q - 1);
  }

  plusQuantity(): void {
    this.selected_quantity.update((q) => q + 1);
  }
  // Quantity End

  newProduct = output<CartItem>();

  addProduct(): void {
    if (this.selected_quantity() <= 0) return;

    this.newProduct.emit({
      productId: this.product().id,
      quantity: this.selected_quantity(),
    });

    this.selected_quantity.set(0);
  }
}
