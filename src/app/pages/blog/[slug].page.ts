import { Component, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Meta, Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';

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

  constructor(private title: Title, private meta: Meta) {
    const post = toSignal(this.post$, { initialValue: null })();

    this.title.setTitle(`${post?.attributes?.title} | Async-IT`);
    this.meta.updateTag({
      name: 'description',
      content: post?.attributes?.description
    });
    this.meta.updateTag({ property: 'og:title', content:post?.attributes?.title });
    this.meta.updateTag({
      property: 'og:description',
      content: post?.attributes?.description,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: post?.attributes?.coverImage,
    });
    this.meta.updateTag({
      name: 'canonical',
      content: `https://async-it.com/blog/${post?.slug}`,
    });
  }

  ngOnInit(): void {
   
  }
}
