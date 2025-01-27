import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'sb-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule],
  host: { ngSkipHydration: 'true' },
})
export class ContactFormComponent implements OnInit {
  contactForm?: FormGroup;

  constructor(private readonly httpClient: HttpClient) {}

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
        if (res.statusCode === 200) {
          this.contactForm.reset();
        }
      });
  }
}
