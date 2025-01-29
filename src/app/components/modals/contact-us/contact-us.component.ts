import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactFormComponent } from '../../contact-form/contact-form.component';

@Component({
  selector: 'sb-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, ContactFormComponent],
})
export class ContactUsComponent {
  constructor(private readonly dynamicDialogRef: DynamicDialogRef) {}

  close(confirm: boolean) {
    this.dynamicDialogRef.close(confirm);
  }
}
