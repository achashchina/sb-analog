import { Component, inject, effect, Inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { Subscription, filter, take } from 'rxjs';

@Component({
  selector: 'async-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent, FooterComponent],
  template: `
    <div class="scroll-watcher"></div>
    <async-top-menu></async-top-menu>
    <router-outlet />
    <async-footer></async-footer>
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
export class AppComponent implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    @Inject('IS_BROWSER') public isBrowser: boolean,
    private router: Router
  ) {
    effect(() => {
      this.subscriptions.add(
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe(() => (isBrowser ? window.scrollTo({ top: 0 }) : null))
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
