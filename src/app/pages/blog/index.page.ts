import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import PostsApiResponse from 'src/app/interfaces/posts-api-response';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'async-blog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './blog.component.html',
})
export default class BlogComponent {
  posts$: Observable<any[]>;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.posts$ = this.getPosts();
  }

  getPosts() {
    return this.httpClient.get<PostsApiResponse>('/api/v1/linkedin-posts').pipe(
      map((res) =>
        'error' in res.body
          ? []
          : res.body.response.map((x) => ({
              ...x,
              iframe: this.sanitizer.bypassSecurityTrustHtml(x.iframe),
              // iframe: this.sanitizer.bypassSecurityTrustHtml(x.iframe.replace(/width="\d+"/, 'width="700"')),
            }))
      )
    );
  }
}
