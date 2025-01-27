import { Component, Inject, PLATFORM_ID, InjectionToken  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { isPlatformBrowser } from '@angular/common';

const firebaseConfig = {
  apiKey: 'AIzaSyC4NyJoMKtl759h-yk73zzzWsNvXqgLVNs',
  authDomain: 'async-it-over.firebaseapp.com',
  projectId: 'async-it-over',
  storageBucket: 'async-it-over.firebasestorage.app',
  messagingSenderId: '707470840048',
  appId: '1:707470840048:web:283e97cae4c48807fc7235',
  measurementId: 'G-YMZ2XGV8CR',
};

@Component({
  selector: 'sb-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent],
  template: `
    <sb-top-menu></sb-top-menu>
    <router-outlet />
  `,
  styles: `
    :host {
      max-width: 1280px;
      margin: 0 auto;
      // padding: 2rem;
    }

    nav {
      text-align: left;
      padding: 0 0 2rem 0;
    }
  `,
})
export class AppComponent {
}
