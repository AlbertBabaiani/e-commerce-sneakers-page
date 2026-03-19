import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { CartDisplayItem, CartItem } from '../../shared/productModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, TitleCasePipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = input.required<CartDisplayItem[]>();
  deleteProduct = output<CartItem>();

  // Helpers

  products = computed(() => {
    return this.cart().map((p) => {
      const price = p.product.price * (1 - p.product.discount);
      return {
        id: p.product.id,
        name: p.product.name,
        imgUrl: p.product.images[0]?.thumb || '',
        price,
        quantity: p.quantity,
        totalPrice: price * p.quantity,
      };
    });
  });
}
