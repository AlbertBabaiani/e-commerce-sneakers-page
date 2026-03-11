import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductContent } from './components/product-content/product-content';
import { ImageCarousel } from './components/image-carousel/image-carousel';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductContent, ImageCarousel, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('e-commerce-sneakers-page');
}
