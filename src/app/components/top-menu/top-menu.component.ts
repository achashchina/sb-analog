import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'sb-top-menu',
  templateUrl: './top-menu.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, RouterLinkActive],
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent {
}
