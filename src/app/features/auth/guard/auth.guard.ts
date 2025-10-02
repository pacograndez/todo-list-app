import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../state/auth-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  const isLoggedIn = authStateService.isLoggedIn();
  const token = authStateService.getToken();
  const isLoginRoute = state.url.includes('/login');

  if (token && authStateService.isTokenExpired(token)) {
    authStateService.logout();
    return false;
  }

  if (isLoggedIn && isLoginRoute) {
    return router.parseUrl('/tasks');
  }

  if (!isLoggedIn && !isLoginRoute) {
    return router.parseUrl('/login');
  }


  return true;
};
