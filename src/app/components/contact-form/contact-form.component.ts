import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'async-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule],
  host: { ngSkipHydration: 'true' },
})
export class ContactFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<boolean>();
  contactForm?: FormGroup;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl(''),
    });
  }

  get name() {
    return this.contactForm?.get('name') || new FormControl();
  }

  get email() {
    return this.contactForm?.get('email') || new FormControl();
  }

  send() {
    this.httpClient
      .post<{ statusCode: number; body: any }>(
        '/api/v1/save-request',
        this.contactForm.value
      )
      .subscribe((res) => {
        this.closeForm.emit(true);
        if (res.statusCode === 200) {
          this.contactForm.reset();
          this.toastr.success(
            `We'll get back to you soon.`,
            'Message received!'
          );
        } else {
          this.toastr.error('Please try again.', 'Oops! Something went wrong');
        }
      });
  }
}
