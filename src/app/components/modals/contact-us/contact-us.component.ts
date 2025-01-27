import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'sb-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    InputTextareaModule,
  ],
})
export class ContactUsComponent {
  title = 'Are you sure?';
  body?: string;
  width: string = '345px';
  btnTypePrimary: boolean = true;

  cancelLabel = 'Cancel';
  confirmLabel = 'Confirm';

  name: string | undefined;
  email: string | undefined;
  comment: string | undefined;

  constructor(
    private readonly dynamicDialogRef: DynamicDialogRef,
    private readonly dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.title = this.dynamicDialogConfig.data?.title || this.title;
    this.body = this.dynamicDialogConfig.data?.body || this.body;
    this.width = this.dynamicDialogConfig.data?.width || this.width;
    this.btnTypePrimary = this.dynamicDialogConfig.data?.btnTypePrimary;

    this.cancelLabel =
      this.dynamicDialogConfig.data?.cancelLabel || this.cancelLabel;
    this.confirmLabel =
      this.dynamicDialogConfig.data?.confirmLabel || this.confirmLabel;
  }

  close(confirm: boolean) {
    this.dynamicDialogRef.close(confirm);
  }
}
