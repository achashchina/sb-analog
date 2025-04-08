import { ContentFile, injectContentFiles } from '@analogjs/content';
import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { PortfolioService } from '../../pages/portfolio/portfolio.service';
import { Project } from '../../pages/portfolio/project.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactUsComponent } from '../modals/contact-us/contact-us.component';

@Component({
  selector: 'async-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, RouterLinkActive],
  styleUrl: './footer.component.scss',
  providers: [DialogService],
})
export class FooterComponent implements OnInit {
  readonly itsFooter = input<boolean>();
  posts: ContentFile<any>[] = injectContentFiles<any>();

  projects$: Observable<{ projects: Project[] }>;

  constructor(
    private portfolioService: PortfolioService,
    private dialogService: DialogService,
  ) {}


  ngOnInit(): void {
    this.posts = this.posts.filter((i) => i.attributes.footer);
    this.projects$ = this.portfolioService.get$();
  }

  contactUsOpen() {
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
