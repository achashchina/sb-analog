import {
  Component,
  Inject,
  InjectionToken,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CanvasComponent } from '../../components/canvas/canvas.component';
import { CardComponent } from '../../components/card/card.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { HttpClient } from '@angular/common/http';
import { ContactUsComponent } from '../../components/modals/contact-us/contact-us.component';

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
  selector: 'sb-landing',
  standalone: true,
  imports: [
    CommonModule,
    CanvasComponent,
    ButtonModule,
    CardComponent,
    ContactFormComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
})
export default class LandingComponent implements OnInit {
  industries?: Array<Industry>;
  isBrowser = false;
  mode = ChooseUs;
  currentIndustry?: Industry;
  activePicture: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private readonly dialogService: DialogService,
    private readonly httpClient: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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

  createFile() {
    return this.httpClient
      .get<any[]>('/api/v1/get-articles')
      .subscribe((data) => console.log(data));
  }

  getData() {
    // return this.httpClient.get<any[]>('/api/v1/todos');
    return this.httpClient.get<{ industries: Array<Industry> }>(
      '/data/data.json'
    );
  }

  open() {
    this.dialogService
      .open(ContactUsComponent, {
        data: {
          title: 'Are you sure you want to delete this transaction?',
          body: 'If you delete this transaction, all data you already saved will be lost.',
        },
      })
      .onClose.subscribe();
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
