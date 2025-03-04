import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ChooseUs } from '../../pages/landing/index.page';

@Component({
  selector: 'async-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  providers: [DialogService]
})
export class CardComponent {
  @Input() mode = ChooseUs.NO;
  @Input({ required: true }) settings?: {
    icon?: string;
    header?: string;
    subheader?: string;
    body?: string;
    list?: string[];
  };
}
