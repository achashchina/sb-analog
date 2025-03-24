import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PortfolioService } from './portfolio.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'async-portfolio-details',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ContactFormComponent],
  templateUrl: 'portfolio-details.component.html',
  styleUrl: 'portfolio.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class PortfolioDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly portfolioService = inject(PortfolioService);

  readonly project$ = this.portfolioService
    .get$()
    .pipe(
      switchMap((list) =>
        this.route.paramMap.pipe(
          map((params) =>
            list.projects.find((x) => x.slug === params.get('slug'))
          )
        )
      )
    );
}
