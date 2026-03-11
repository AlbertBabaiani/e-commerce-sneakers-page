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

      const mainImg = p.product.imgUrls[0] || '';
      let imgUrl = '';
      if (mainImg) {
        const lastDotIndex = mainImg.lastIndexOf('.');
        imgUrl = `${mainImg.substring(0, lastDotIndex)}-thumbnail${mainImg.substring(lastDotIndex)}`;
      }

      return {
        id: p.product.id,
        name: p.product.name,
        imgUrl,
        price,
        quantity: p.quantity,
        totalPrice: price * p.quantity,
      };
    });
  });
}
