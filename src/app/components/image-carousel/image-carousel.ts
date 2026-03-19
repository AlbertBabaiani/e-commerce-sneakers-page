// image-carousel.ts
import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../shared/productModel';

@Component({
  selector: 'section[app-image-carousel]',
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss',
})
export class ImageCarousel {
  product = input.required<Product>();
  currentSlideIndex = signal(0);

  previous(): void {
    this.currentSlideIndex.update((index) => {
      const newIndex = index === 0 ? this.product().images.length - 1 : index - 1;
      return newIndex;
    });
  }

  next(): void {
    this.currentSlideIndex.update((index) => {
      const newIndex = index === this.product().images.length - 1 ? 0 : index + 1;
      return newIndex;
    });
  }

  setImageSlide(index: number) {
    if (index >= 0 && index < this.product().images.length) {
      this.currentSlideIndex.set(index);
    }
  }
}
