import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductContent } from './components/product-content/product-content';
import { ImageCarousel } from './components/image-carousel/image-carousel';
import { Navbar } from './components/navbar/navbar';
import { Cart } from './components/cart/cart';
import { CartService } from './core/cart-service';
import { CartItem } from './shared/productModel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductContent, ImageCarousel, Navbar, Cart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('e-commerce-sneakers-page');

  private cartService = inject(CartService);
  cart = this.cartService.cart;

  selectedProduct = computed(() => this.cartService.stock()[0]);
  selectedProductsQuantity = this.cartService.selectedProductsQuantity;

  cartShowed = signal<boolean>(false);

  toggleCartView(): void {
    this.cartShowed.update((v) => !v);
  }

  addProduct(newProduct: CartItem): void {
    this.cartService.addProduct(newProduct);
  }

  deleteProduct(product: CartItem): void {
    this.cartService.deleteProduct(product);
  }
}
