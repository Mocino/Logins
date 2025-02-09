import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/AuthStatus.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router      = inject(Router);

  if (authService.autStatus() === AuthStatus.authenticated){
    return true;
  }

  console.log({status: authService.autStatus()})
  router.navigateByUrl('/auth/login')
  return true;
};
