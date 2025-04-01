import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

@Component({
  selector: 'async-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent],
  template: `
    <async-top-menu></async-top-menu>
    <router-outlet />
  `,
  styles: `
    :host {
      max-width: 1280px;
      margin: 0 auto;
    }

    nav {
      text-align: left;
      padding: 0 0 2rem 0;
    }
  `,
})
export class AppComponent {}
