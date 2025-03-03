import { Component } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Project {
  img: string;
  name: string;
  description: string;
  techStack: string[];
  industry: string;
}

@Component({
  selector: 'async-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [CommonModule, NgForOf, NgIf, AsyncPipe]
})
export default class PortfolioPage {
  projects$: Observable<{ projects: Project[] }>;

  constructor(private httpClient: HttpClient) {
    this.projects$ = this.fetchProjects();
  }

  fetchProjects(): Observable<{ projects: Project[] }> {
    return this.httpClient.get<{ projects: Project[] }>('/data/projects.json');
  }
}
