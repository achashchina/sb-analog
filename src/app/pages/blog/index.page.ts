import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'async-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styles: `
  :host {
    min-height: 100vh;
    display: block;
    background: #f6f6f6;
  }`,
})
export default class BlogComponent implements OnInit {
  posts = injectContentFiles<any>();

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Blog | Async-IT');
    this.meta.updateTag({
      name: 'description',
      content:
        'Stay up to date with Async-IT insights on web development, design, and IT strategy.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Blog | Async-IT' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Web development tips, IT strategy advice, and industry insights from the Async-IT team.',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });
    this.meta.updateTag({
      name: 'canonical',
      content: 'https://async-it.co/blog',
    });
  }
}
