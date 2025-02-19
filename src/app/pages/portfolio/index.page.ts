import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'sb-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [
    NgForOf,
    NgIf
  ]
})
export default class PortfolioPage {
  projects = [
    {
      title: 'Angular SaaS Healthcare Project',
      description: 'SaaS Healthcare Project with Angular framework as frontend',
      techStack: ['Angular', 'HTML5', 'CSS3', 'Web Development'],
      industry: 'Healthcare',
      image: '../public/images/portfolio/healthcare-project.png',
      link: '#'
    },
    {
      title: 'LMS for Math Courses',
      description: 'This LMS was built with Angular. My key goal was optimization rxjs streams',
      techStack: ['Angular', 'RxJs', 'Web Application Development', 'Web Development', 'Firebase'],
      industry: '',
      image: '../public/images/portfolio/math_courses.png',
      link: '#'
    },
    {
      title: 'Angular application with oAuth',
      description: 'Angular application dashboard with oAuth, MongoDB, Express.js',
      techStack: ['Angular', 'Express', 'Mongo DB', 'Front-End Development', 'Web API'],
      industry: '',
      image: '../public/images/portfolio/oAuth-app.png',
      link: '#'
    },
    {
      title: 'Application for Vispo',
      description: 'collaboration between investors & founders',
      techStack: ['MEAN Stack', 'Angular', 'RxJs', 'Tailwind CSS', 'Java Script'],
      industry: '',
      image: '../public/images/portfolio/vispo_project.png',
      link: '#'
    }
  ];
}
