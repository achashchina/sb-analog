import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Project } from './project.interface';
import { PortfolioService } from './portfolio.service';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactUsComponent } from '../../components/modals/contact-us/contact-us.component';

@Component({
  selector: 'async-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [CommonModule, ButtonModule, NgForOf, NgIf, AsyncPipe, RouterLink],
  providers: [DialogService],
  styles: `
  :host {
    min-height: 100vh;
    display: block;
    background: #f6f6f6;
  }`,
})
export default class PortfolioPage implements OnInit {
  projects$: Observable<{ projects: Project[] }>;
  constructor(
    private portfolioService: PortfolioService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.projects$ = this.portfolioService.get$();
  }

  openModal() {
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
