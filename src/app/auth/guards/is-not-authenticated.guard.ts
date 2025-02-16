import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/AuthStatus.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router      = inject(Router);

  if (authService.autStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
