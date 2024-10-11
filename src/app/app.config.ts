import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import {tokenInterceptor} from '../tools/token.interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    provideHttpClient(withInterceptors([tokenInterceptor])
    )
  ]
};
