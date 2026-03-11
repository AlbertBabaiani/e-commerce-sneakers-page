import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'section[app-image-carousel]',
  imports: [],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss',
})
export class ImageCarousel {
  private productImgSlide = signal<number>(1);

  private maxQuantity = 4;

  imgUrl = computed(
    () => `assets/images/products/product-1/image-product-${this.productImgSlide()}.jpg`,
  );

  previous(): void {
    if (this.productImgSlide() === 1) this.productImgSlide.set(this.maxQuantity);
    else this.productImgSlide.set(this.productImgSlide() - 1);
  }

  next(): void {
    if (this.productImgSlide() === this.maxQuantity) this.productImgSlide.set(1);
    else this.productImgSlide.set(this.productImgSlide() + 1);
  }
}
