import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      switch (error.status) {
        case 401:
          errorMessage = `Invalid API key.`;
          break;
        case 403:
          errorMessage =
            'Forbidden: Do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'City Data Not Found, Please check the city name.';
          break;
        case 429:
          errorMessage = 'API rate limit exceeded. Please try again later.';
          break;
        case 500:
          errorMessage = `Internal Server Error: ${
            error.error?.message || 'Something went wrong on the server.'
          }`;
          break;
        case 502:
        case 503:
        case 504:
          errorMessage =
            'Server is currently unavailable. Please try again later.';
          break;
        default:
          errorMessage = 'An unknown error occurred!';
          break;
      }
      return throwError(() => new Error(errorMessage));
    })
  );
};
