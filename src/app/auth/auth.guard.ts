import { CanActivateChildFn, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const redirectToLogin = (): UrlTree => inject(Router).createUrlTree(['/login']);

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated() ? true : redirectToLogin();
};

export const authChildGuard: CanActivateChildFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated() ? true : redirectToLogin();
};
