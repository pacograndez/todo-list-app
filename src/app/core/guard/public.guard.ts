import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../../features/auth/state/auth-state.service';

export const publicGuard: CanActivateFn = () => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  if (authStateService.isLoggedIn()) {
    return router.navigate(['/tasks']);
  }

  return true;
};
