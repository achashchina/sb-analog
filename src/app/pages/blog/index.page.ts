import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sb-blog',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog.component.html'

})
export default class BlogComponent implements OnInit {
  readonly posts = injectContentFiles<PostAttributes>();
  date = Date.now();
  date2 = Date.now() - 1;

  ngOnInit(): void {
    // console.log(this.posts);
  }
}
