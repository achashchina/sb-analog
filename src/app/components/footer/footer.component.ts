import { ContentFile, injectContentFiles } from '@analogjs/content';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { PortfolioService } from '../../pages/portfolio/portfolio.service';
import { Project } from '../../pages/portfolio/project.interface';

@Component({
  selector: 'async-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, RouterLinkActive],
  styleUrl: './footer.component.scss',
  providers: [],
})
export class FooterComponent implements OnInit {
  posts: ContentFile<any>[] = injectContentFiles<any>();

  projects$: Observable<{ projects: Project[] }>;
  constructor(
    private portfolioService: PortfolioService,
  ) {}


  ngOnInit(): void {
    this.posts = this.posts.filter((i) => i.attributes.footer);
    this.projects$ = this.portfolioService.get$();
  }
}
