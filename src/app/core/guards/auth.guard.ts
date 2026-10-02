import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  // MSAL authentication check goes here when Azure AD is wired up
  // For now — allow all routes through
  return true;
};