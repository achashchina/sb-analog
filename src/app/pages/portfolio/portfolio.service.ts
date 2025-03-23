import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from './project.interface';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private projects = new BehaviorSubject<{ projects: Project[] }>(null);
  private projects$ = this.projects.asObservable();

  constructor(private httpClient: HttpClient) {
    this.projects$ = this.getProjects();
  }

  get$() {
    return this.projects$;
  }

  private getProjects(): Observable<{ projects: Project[] }> {
    return this.httpClient.get<{ projects: Project[] }>('/data/projects.json');
  }
}
