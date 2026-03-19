import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../shared/productModel';

@Component({
  selector: 'section[app-image-carousel]',
  imports: [],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss',
})
export class ImageCarousel {
  product = input.required<Product>();

  currentSlideIndex = signal(0);

  currentImgUrl = computed(() => this.product().images[this.currentSlideIndex()].full);

  previous(): void {
    this.currentSlideIndex.update((index) =>
      index === 0 ? this.product().images.length - 1 : index - 1,
    );
  }

  next(): void {
    this.currentSlideIndex.update((index) =>
      index === this.product().images.length - 1 ? 0 : index + 1,
    );
  }

  setImageSlide(index: number) {
    if (index >= 0 && index < this.product().images.length) {
      this.currentSlideIndex.set(index);
    }
  }
}
