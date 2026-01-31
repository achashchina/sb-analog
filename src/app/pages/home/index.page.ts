import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CanvasComponent } from '../../components/canvas/canvas.component';
import { CardComponent } from '../../components/card/card.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { TypewriterComponent } from './typewriter/typewriter.component';
import { Meta, Title } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'async-landing',
  standalone: true,
  imports: [
    CommonModule,
    CanvasComponent,
    ButtonModule,
    forwardRef(() => CardComponent),
    ContactFormComponent,
    TypewriterComponent,
    TableModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingComponent implements OnInit {
  @ViewChildren('animated') toAnimateEls!: QueryList<ElementRef>;
  activePicture: number = 0;

  // products = [
  //   {
  //     header: 'United States',
  //     list: [
  //       {
  //         name: 'US Twin + Standard Pillowcases',
  //         duvet: ['66 × 86 inch', '167 × 219 cm'],
  //         pillow: ['20 × 26 inch', '51 × 66 cm'],
  //       },
  //       {
  //         name: 'US Queen + Standard Pillowcases',
  //         duvet: ['88 × 90 inch', '224 × 229 cm'],
  //         pillow: ['20 × 26 inch', '51 × 66 cm'],
  //       },
  //       {
  //         name: 'US Queen + Queen Pillowcases',
  //         duvet: ['88 × 90 inch', '224 × 229 cm'],
  //         pillow: ['20 × 30 inch', '51 × 76 cm'],
  //       },
  //       {
  //         name: 'US King + Standard Pillowcases',
  //         duvet: ['102 × 90 inch', '259 × 229 cm'],
  //         pillow: ['20 × 26 inch', '51 × 66 cm'],
  //       },
  //       {
  //         name: 'US King + Queen Pillowcases',
  //         duvet: ['102 × 90 inch', '259 × 229 cm'],
  //         pillow: ['20 × 30 inch', '51 × 76 cm'],
  //       },
  //       {
  //         name: 'US King + King Pillowcases',
  //         duvet: ['102 × 90 inch', '259 × 229 cm'],
  //         pillow: ['20 × 36 inch', '51 × 91 cm'],
  //       },
  //       {
  //         name: 'US CAL King + Standard pillowcases',
  //         duvet: ['104 × 94 inch', '264 × 239 cm'],
  //         pillow: ['20 × 36 inch', '51 × 91 cm'],
  //       },
  //       {
  //         name: 'US CAL King + Queen pillowcases',
  //         duvet: ['104 × 94 inch', '264 × 239 cm'],
  //         pillow: ['20 × 30 inch', '51 × 76 cm'],
  //       },
  //       {
  //         name: 'US CAL King + King pillowcases',
  //         duvet: ['104 × 94 inch', '264 × 239 cm'],
  //         pillow: ['20 × 36 inch', '51 × 91 cm'],
  //       },
  //     ],
  //   },
  //   {
  //     header: 'UK / EUROPE',
  //     list: [
  //       {
  //         name: 'UK / EU Single + Standard Pillowcases',
  //         duvet: ['53 × 79 inch', '135 × 200 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //       {
  //         name: 'UK Double (like in IKEA) + Standard Pillowcases',
  //         duvet: ['79 × 79 inch', '200 × 200 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //       {
  //         name: 'EU Double + Standard Pillowcases',
  //         duvet: ['79 × 86 inch', '200 × 220 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //       {
  //         name: 'UK King + Standard Pillowcases',
  //         duvet: ['91 × 86 inch', '230 × 220 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //       {
  //         name: 'EU King (like in IKEA) + Standard Pillowcases',
  //         duvet: ['94 × 86 inch', '240 × 220 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //     ],
  //   },
  //   {
  //     header: 'AUSTRALIA',
  //     list: [
  //       {
  //         name: 'AU Queen + Standard Pillowcases',
  //         duvet: ['83 × 83 inch', '210 × 210 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //       {
  //         name: 'AU King + Standard Pillowcases',
  //         duvet: ['96 × 83 inch', '245 × 210 cm'],
  //         pillow: ['20 × 27 inch', '50 × 70 cm'],
  //       },
  //     ],
  //   },
  // ];

  constructor(
    @Inject('IS_BROWSER') public isBrowser: boolean,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Async-IT | Custom Web Solutions That Inspire');
    this.meta.updateTag({
      name: 'description',
      content:
        'We build unique and powerful websites tailored to your vision. Get expert development with zero bureaucracy and full transparency.',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Async-IT | Custom Web Solutions That Inspire',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'We create functional and beautiful web experiences for your business.',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://async-it.co/images/og/og-landing.webp',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'canonical',
      content: 'https://async-it.co/',
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const observer = this.addObserver();
      this.toAnimateEls.forEach((el: ElementRef) => {
        observer?.observe(el.nativeElement);
      });
    }
  }

  private addObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting
            ? entry.target.classList.add('in-view')
            : entry.target.classList.remove('in-view');
          entry.isIntersecting
            ? entry.target.classList.remove('not-in-view')
            : entry.target.classList.add('not-in-view');
        });
      },
      {
        rootMargin: '0px',
        threshold: [0, 0.1, 1],
      }
    );
  }
}
