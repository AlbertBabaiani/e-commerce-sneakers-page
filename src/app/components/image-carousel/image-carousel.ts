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

  currentSlideIndex = signal<number>(0);

  images = computed(() => {
    return this.product().imgUrls.map((url) => {
      const lastDotIndex = url.lastIndexOf('.');
      const thumbUrl = `${url.substring(0, lastDotIndex)}-thumbnail${url.substring(lastDotIndex)}`;

      return { full: url, thumb: thumbUrl };
    });
  });

  currentImgUrl = computed(() => this.images()[this.currentSlideIndex()].full);

  previous(): void {
    this.currentSlideIndex.update((index) => (index === 0 ? this.images().length - 1 : index - 1));
  }

  next(): void {
    this.currentSlideIndex.update((index) => (index === this.images().length - 1 ? 0 : index + 1));
  }

  setImageSlide(index: number) {
    if (index >= 0 && index < this.images().length) {
      this.currentSlideIndex.set(index);
    }
  }
}
