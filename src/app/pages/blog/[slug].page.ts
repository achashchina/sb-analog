import { Component, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'async-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, ContactFormComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>();
}
