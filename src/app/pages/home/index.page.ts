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
