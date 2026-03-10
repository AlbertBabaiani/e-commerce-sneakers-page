import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductContent } from './components/product-content/product-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductContent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('e-commerce-sneakers-page');
}
