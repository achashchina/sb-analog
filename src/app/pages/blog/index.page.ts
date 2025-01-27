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
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>((contentFile) =>
    {
      console.log(contentFile.filename);
      return !contentFile.filename.includes('/src/content/blog/')
    }
  );
}
