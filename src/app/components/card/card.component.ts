import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'async-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  providers: [DialogService]
})
export class CardComponent {
  @Input({ required: true }) settings?: {
    mode?: number;
    icon?: string;
    header?: string;
    subheader?: string;
    body?: string;
    list?: string[];
    slug?: string; 
  };
}
