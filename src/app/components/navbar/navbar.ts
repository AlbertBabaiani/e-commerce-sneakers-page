import { TitleCasePipe } from '@angular/common';
import { Component, HostListener, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header[app-navbar]',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  links = ['collections', 'men', 'women', 'about', 'contact'];

  isOpened = signal<boolean>(false);

  isMobile = signal<boolean>(window.innerWidth < 1440);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile.set(event.target.innerWidth < 1440);
  }

  toggleNavBar(): void {
    this.isOpened.update((v) => !v);
  }

  cartQuantity = input.required<number>();

  toggleCart = output<void>();
}
