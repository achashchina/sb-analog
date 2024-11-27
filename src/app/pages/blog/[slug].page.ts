import { Component, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'sb-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
