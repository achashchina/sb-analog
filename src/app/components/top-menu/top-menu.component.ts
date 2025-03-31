import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactUsComponent } from '../modals/contact-us/contact-us.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'async-top-menu',
  templateUrl: './top-menu.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, RouterLinkActive, OverlayPanelModule],
  styleUrl: './top-menu.component.scss',
  providers: [DialogService],
})
export class TopMenuComponent {
  constructor(private readonly dialogService: DialogService) {}

  scrollToForm() {
    const contactFormBlock = document.getElementById('contact-form');
    if (contactFormBlock) {
      contactFormBlock.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      this.dialogService
      .open(ContactUsComponent, {
        data: {
          title: '',
          body: '',
        },
        width: '50vw',
        modal:true,
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
      })
    
    }
  }
}
