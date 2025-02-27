import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastrService } from 'ngx-toastr';
import PostsApiResponse from 'src/app/interfaces/posts-api-response';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'async-admin',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin.component.html',
})
export default class AdminComponent implements OnInit {
  form: FormGroup;
  minDate = new Date();
  constructor(
    private httpClient: HttpClient,
    private readonly toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  get date() {
    return this.form?.get('date');
  }

  get iframe() {
    return this.form?.get('iframe');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: this.fb.control('', Validators.required),
      iframe: this.fb.control('', Validators.required),
    });
  }

  addPost() {
    return this.httpClient
      .post<PostsApiResponse>('/api/v1/linkedin-posts', this.form.value)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.form.reset();
          this.toastr.success(
            `Your post was successfully saved`,
            'Post saved!'
          );
        } else {
          this.toastr.error('Please try again.', 'Oops! Something went wrong');
        }
      });
  }
}
