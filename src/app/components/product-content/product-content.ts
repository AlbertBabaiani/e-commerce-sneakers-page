import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'section[app-product-content]',
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './product-content.html',
  styleUrl: './product-content.scss',
})
export class ProductContent {
  discount = signal<number>(0.5);
  original_price = signal<number>(250);
  current_price = computed(() => this.original_price() * (1 - this.discount()));
}
