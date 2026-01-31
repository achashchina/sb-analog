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
    // this.getAllProducts()
    this.form = this.fb.group({
      date: this.fb.control('', Validators.required),
      iframe: this.fb.control('', Validators.required),
    });
  }

  getAllProducts() {
    return this.httpClient
      .get('https://b2b.housenordic.dk/api/products?username=chaschina.a.lv@gmail.com&password=DuuGMvuT')
      .subscribe((source: any[]) => {
        const allowed = [
          '3960901', 
          '3960915',
          '3960923',
          '1800060',
          '3961004',
          '1800065',
          '3960922',
          '3960924',
          '3960927',
          '3960928',
          '3960919',
          '3960921',
          '3960925',
          '3960920',
          '3960916',
        ]
        
        const result = source.filter(item => allowed.includes(item.sku));
        // console.log(result);
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
