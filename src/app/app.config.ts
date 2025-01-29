import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  PLATFORM_ID,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withShikiHighlighter } from '@analogjs/content/shiki-highlighter';
import { isPlatformBrowser } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(),
    provideContent(withMarkdownRenderer(), withShikiHighlighter()),
    {
      provide: 'IS_BROWSER',
      useFactory: (platformId: Object) => isPlatformBrowser(platformId),
      deps: [PLATFORM_ID],
    },
    provideAnimations(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
};
