import { computed, Injectable, signal } from '@angular/core';
import { CartDisplayItem, CartItem, Product } from '../shared/productModel';

const DEFAULT_DESC =
  'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.';
const DEFAULT_IMAGES = [
  'assets/images/products/product-1/image-product-1.jpg',
  'assets/images/products/product-1/image-product-2.jpg',
  'assets/images/products/product-1/image-product-3.jpg',
  'assets/images/products/product-1/image-product-4.jpg',
];

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _stock = signal<Product[]>([
    {
      id: 'fall-limited-edition-sneakers',
      companyName: 'SNEAKER COMPANY',
      name: 'Fall Limited Edition Sneakers',
      description: DEFAULT_DESC,
      discount: 0.5,
      price: 250,
      imgUrls: DEFAULT_IMAGES,
      inStock: 6,
    },
  ]);
  readonly stock = this._stock.asReadonly();

  private _cartState = signal<CartItem[]>([]);

  readonly cart = computed<CartDisplayItem[]>(() => {
    const currentStock = this._stock();
    const currentCart = this._cartState();

    return currentCart.map((item) => {
      const matchedProduct = currentStock.find((p) => p.id === item.productId);

      return {
        product: matchedProduct!,
        quantity: item.quantity,
      };
    });
  });

  selectedProductsQuantity = computed(() => this._cartState().reduce((p, c) => p + c.quantity, 0));

  addProduct(newProduct: CartItem) {
    this._cartState.update((currentCart) => {
      const existingProduct = currentCart.find((p) => p.productId === newProduct.productId);

      if (existingProduct) {
        return currentCart.map((item) =>
          item.productId === newProduct.productId
            ? { ...item, quantity: item.quantity + newProduct.quantity }
            : item,
        );
      } else {
        return [...currentCart, newProduct];
      }
    });

    this._stock.update((currentStock) => {
      return currentStock.map((p) => {
        if (p.id === newProduct.productId) {
          return { ...p, inStock: p.inStock - newProduct.quantity };
        }
        return p;
      });
    });
  }

  deleteProduct(product: CartItem) {
    this._cartState.update((c) => c.filter((item) => item.productId !== product.productId));

    this._stock.update((currentStock) => {
      return currentStock.map((p) => {
        if (p.id === product.productId) {
          return { ...p, inStock: p.inStock + product.quantity };
        }
        return p;
      });
    });
  }
}
