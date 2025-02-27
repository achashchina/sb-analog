import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'async-blog',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog.component.html',
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>(
    (contentFile) => !contentFile.filename.includes('/src/content/blog/')
  )

}
