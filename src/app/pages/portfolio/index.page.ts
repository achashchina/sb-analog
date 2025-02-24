import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface Project {
  img: string;
  name: string;
  description: string;
  techStack: string[];
  industry: string;
}

@Component({
  selector: 'sb-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [
    NgForOf,
    NgIf
  ]
})
export default class PortfolioPage implements OnInit {
  projects?: Project[];
  isBrowser: boolean;

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.fetchProjects().subscribe(({ projects }) => {
        this.projects = projects;
        setTimeout(() => this.observeProjects(), 500);
      });
    }
  }

  fetchProjects(): Observable<{ projects: Project[] }> {
    return this.httpClient.get<{ projects: Project[] }>('/data/projects.json');
  }

  private observeProjects() {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.remove('not-in-view');
          } else {
            entry.target.classList.remove('in-view');
            entry.target.classList.add('not-in-view');
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    setTimeout(() => {
      const tags = document.querySelectorAll('.to-animate');
      tags.forEach((tag) => observer.observe(tag));
    }, 100);

  }
}
