import { Component, Inject, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { TranslateModule } from '@ngx-translate/core'; // <--- standalone only
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sb-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent, TranslateModule],
  template: `
    <sb-top-menu></sb-top-menu>
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
export class AppComponent {
  constructor(
    @Inject(LOCALE_ID) public localeId: string,
    private translate: TranslateService
  ) {
    console.log(localeId);
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(localeId);

    // this.translate.getBrowserLang()
    
    console.log(translate.instant('test.title'));
  }
}
