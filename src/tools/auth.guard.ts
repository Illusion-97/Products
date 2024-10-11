import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)
  const router = inject(Router)
  return service.isLogged || router.createUrlTree(["/auth/login"]);
};
