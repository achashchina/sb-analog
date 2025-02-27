import {
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CanvasComponent } from '../../components/canvas/canvas.component';
import { CardComponent } from '../../components/card/card.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { HttpClient } from '@angular/common/http';
import { TypewriterComponent } from './typewriter/typewriter.component';
import {TranslateModule} from "@ngx-translate/core";

interface Industry {
  img: string;
  name: string;
  description: string;
}

export enum ChooseUs {
  NO,
  YES,
}

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
    TranslateModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
})
export default class LandingComponent implements OnInit {
  industries?: Array<Industry>;
  mode = ChooseUs;
  currentIndustry?: Industry;
  activePicture: number = 0;
  today = new Date()

  constructor(
    @Inject('IS_BROWSER') public isBrowser: boolean,
    private readonly httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      const observer = this.addObserver();
      const tags = document.querySelectorAll('.to-animate');
      tags.forEach((tag) => {
        observer?.observe(tag);
      });
    }

    this.getData().subscribe(
      ({ industries }) => (
        (this.industries = industries), (this.currentIndustry = industries[0])
      )
    );
  }

  getData() {
    return this.httpClient.get<{ industries: Array<Industry> }>(
      '/data/data.json'
    );
  }

  private addObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
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
