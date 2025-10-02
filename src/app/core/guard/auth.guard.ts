import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStateService } from '../../features/auth/state/auth-state.service';

export const authGuard: CanActivateFn = () => {
  const authStateService = inject(AuthStateService);

  if (authStateService.isLoggedIn()) {
    return true;
  }

  authStateService.logout();
  return false;
};
