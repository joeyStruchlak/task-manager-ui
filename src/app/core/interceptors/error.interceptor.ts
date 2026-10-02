import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const problem = error.error;

      switch (error.status) {
        case 400:
          console.error('[400] Validation error', problem);
          break;
        case 401:
          console.error('[401] Unauthorised');
          break;
        case 404:
          console.error('[404] Not found', problem);
          break;
        case 500:
          console.error('[500] Server error', problem);
          break;
        default:
          console.error('[Network error]', error.message);
      }

      return throwError(() => problem);
    }),
  );
};
