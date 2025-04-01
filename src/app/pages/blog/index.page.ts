import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

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

  ngOnInit(): void {
    // console.log(this.posts);
    
  }
}
