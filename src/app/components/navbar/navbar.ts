import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
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

  toggleNavBar(): void {
    this.isOpened.update((v) => !v);
  }
}
