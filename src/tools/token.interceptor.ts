import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if(req.url.startsWith(environment.API_URL) && auth.token) {
    req = req.clone({ // remplacer la requête qui allait partir par une copie avec des modifications
      setHeaders: {
        Authorization: `Bearer ${auth.token}`
      }
    })
  }

  return next(req).pipe(catchError(error => {
    if(req.url.startsWith(environment.API_URL) && error.status == 401)
      auth.logout()

    return throwError(() => error)
  }));
};
