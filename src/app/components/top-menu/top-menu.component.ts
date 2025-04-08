import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, effect, signal } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactUsComponent } from '../modals/contact-us/contact-us.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FooterComponent } from '../footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'async-top-menu',
  templateUrl: './top-menu.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    OverlayPanelModule,
    FooterComponent,
  ],
  styleUrl: './top-menu.component.scss',
  providers: [DialogService],
})
export class TopMenuComponent implements OnInit {
  mobileMenuOpened = signal(false);
  menuIcon = 'pi pi-bars';

  constructor(
    private readonly dialogService: DialogService,
    private router: Router,
    @Inject('IS_BROWSER') public isBrowser: boolean
  ) {
    effect(() => {
      this.menuIcon = this.mobileMenuOpened() ? 'pi pi-times' : 'pi pi-bars';
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.mobileMenuOpened.set(false);
        if (this.isBrowser) {
          document.body.style.overflow = 'auto';
        }
      });
  }

  toggleMenu() {
    this.mobileMenuOpened.set(!this.mobileMenuOpened());
    document.body.style.overflow = this.mobileMenuOpened() ? 'hidden' : 'auto';
  }

  scrollToForm() {
    const contactFormBlock = document.getElementById('contact-form');
    if (contactFormBlock) {
      contactFormBlock.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      this.dialogService.open(ContactUsComponent, {
        data: {
          title: '',
          body: '',
        },
        width: '50vw',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
      });
    }
  }
}
